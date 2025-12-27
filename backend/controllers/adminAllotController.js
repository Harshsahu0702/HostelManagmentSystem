const mongoose = require("mongoose");
const HostelSetup = require("../models/HostelSetup");
const StudentRegistration = require("../models/StudentRegistration");

// ================= GET ALL ROOMS =================
exports.getAllRooms = async (req, res) => {
  try {
    const setup = await HostelSetup.findOne({
      hostelId: req.user.hostelId,
      status: "COMPLETED",
    }).select("generatedRooms");

    if (!setup) {
      return res.status(404).json({
        success: false,
        message: "Hostel setup not found",
      });
    }

    res.json({ success: true, data: setup.generatedRooms });
  } catch (err) {
    console.error("getAllRooms error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ================= GET AVAILABLE ROOMS =================
exports.getAvailableRooms = async (req, res) => {
  try {
    const { type } = req.query;

    const setup = await HostelSetup.findOne({
      hostelId: req.user.hostelId,
      status: "COMPLETED",
    }).select("generatedRooms");

    if (!setup) {
      return res.status(404).json({
        success: false,
        message: "Hostel setup not found",
      });
    }

    const rooms = setup.generatedRooms.filter((r) => r.active !== false);

    const normalize = (s) =>
      (s || "")
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const prefNorm = normalize(type);

    const filtered = rooms.filter((r) => {
      const occ = Number(r.occupiedCount || 0);
      const cap = Number(r.capacity || 1);
      if (cap <= occ) return false;

      if (!type) return true;

      const roomNorm = normalize(r.type);
      return (
        roomNorm === prefNorm ||
        roomNorm.includes(prefNorm) ||
        prefNorm.includes(roomNorm)
      );
    });

    res.json({ success: true, data: filtered });
  } catch (err) {
    console.error("getAvailableRooms error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ================= AUTO ALLOT =================
exports.autoAllot = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const setup = await HostelSetup.findOne({
      hostelId: req.user.hostelId,
      status: "COMPLETED",
    }).session(session);

    if (!setup) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "Hostel setup not found" });
    }

    const students = await StudentRegistration.find({
      hostelId: req.user.hostelId,
      status: { $regex: "^pending$", $options: "i" },
    }).session(session);

    let allotted = 0;
    let failed = 0;
    const details = [];

    for (const student of students) {
      const room = setup.generatedRooms.find(
        (r) =>
          r.active !== false &&
          Number(r.occupiedCount || 0) < Number(r.capacity || 1)
      );

      if (!room) {
        failed++;
        details.push({ studentId: student._id, result: "no-room" });
        continue;
      }

      room.occupiedCount = Number(room.occupiedCount || 0) + 1;
      if (room.occupiedCount >= Number(room.capacity || 1)) {
        room.occupied = true;
      }

      student.roomAllocated = room.roomNumber;
      student.status = "Allotted";
      await student.save({ session });

      allotted++;
      details.push({
        studentId: student._id,
        room: room.roomNumber,
        result: "allotted",
      });
    }

    await setup.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, summary: { allotted, failed }, details });
  } catch (err) {
    console.error("autoAllot error", err);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ================= MANUAL ALLOT =================
exports.manualAllot = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { studentId, roomNumber } = req.body;

    const setup = await HostelSetup.findOne({
      hostelId: req.user.hostelId,
      status: "COMPLETED",
    }).session(session);

    if (!setup) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "Hostel setup not found" });
    }

    const student = await StudentRegistration.findOne({
      _id: studentId,
      hostelId: req.user.hostelId,
    }).session(session);

    if (!student) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const room = setup.generatedRooms.find(
      (r) => r.roomNumber === roomNumber
    );

    if (!room) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    if (Number(room.occupiedCount || 0) >= Number(room.capacity || 1)) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ success: false, message: "Room is full" });
    }

    room.occupiedCount = Number(room.occupiedCount || 0) + 1;
    if (room.occupiedCount >= Number(room.capacity || 1)) {
      room.occupied = true;
    }

    student.roomAllocated = room.roomNumber;
    student.status = "Allotted";

    await student.save({ session });
    await setup.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: "Room allotted successfully" });
  } catch (err) {
    console.error("manualAllot error", err);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
