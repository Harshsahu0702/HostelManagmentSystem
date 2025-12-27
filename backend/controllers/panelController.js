const Notification = require("../models/Notification");
const Complaint = require("../models/Complaint");
const AntiRagging = require("../models/AntiRaggingReport");
const MessMenu = require("../models/MessMenu");
const DepartureRequest = require("../models/DepartureRequest");
const FeeRecord = require("../models/FeeRecord");
const ChatMessage = require("../models/ChatMessage");
const Feedback = require("../models/Feedback");

// 🔔 Notifications
exports.getNotificationsForStudent = async (req, res) => {
  try {
    const notes = await Notification.find({
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
};

// 📢 Complaints
exports.createComplaint = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    };

    const comp = new Complaint(payload);
    await comp.save();

    res.status(201).json({ success: true, data: comp });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving complaint" });
  }
};

exports.getComplaintsForStudent = async (req, res) => {
  try {
    const list = await Complaint.find({
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching complaints" });
  }
};

// 🛑 Anti-ragging
exports.createAntiRagging = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    };

    const r = new AntiRagging(payload);
    await r.save();

    res.status(201).json({ success: true, data: r });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving report" });
  }
};

exports.getAntiRaggingForStudent = async (req, res) => {
  try {
    const list = await AntiRagging.find({
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching reports" });
  }
};

// 🍽️ Mess Menu
exports.getMessMenu = async (req, res) => {
  try {
    const menu = await MessMenu.findOne({
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    if (!menu) {
      return res.status(404).json({ success: false, message: "No menu found" });
    }

    res.json({ success: true, data: menu });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching menu" });
  }
};

// ✈️ Departure
exports.createDeparture = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    };

    const d = new DepartureRequest(payload);
    await d.save();

    res.status(201).json({ success: true, data: d });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating departure request" });
  }
};

exports.getDeparturesForStudent = async (req, res) => {
  try {
    const list = await DepartureRequest.find({
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching departures" });
  }
};

// 💰 Fees
exports.getFeesForStudent = async (req, res) => {
  try {
    const list = await FeeRecord.find({
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching fees" });
  }
};

// 💬 Chat
exports.postChatMessage = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      fromStudent: req.user.id,
      hostelId: req.user.hostelId,
    };

    if (!payload.text) {
      return res.status(400).json({ success: false, message: "Message text is required" });
    }

    const m = new ChatMessage(payload);
    await m.save();

    res.status(201).json({ success: true, data: m });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving message" });
  }
};

exports.getChatForStudent = async (req, res) => {
  try {
    const list = await ChatMessage.find({
      hostelId: req.user.hostelId,
      $or: [
        { fromStudent: req.user.id },
        { to: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching chat" });
  }
};

// ⭐ Feedback
exports.postFeedback = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    };

    const f = new Feedback(payload);
    await f.save();

    res.status(201).json({ success: true, data: f });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving feedback" });
  }
};

exports.getFeedbackForStudent = async (req, res) => {
  try {
    const list = await Feedback.find({
      studentId: req.user.id,
      hostelId: req.user.hostelId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching feedback" });
  }
};
