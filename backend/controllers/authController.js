const Student = require("../models/Student");
const Admin = require("../models/Admin");

// STUDENT LOGIN
exports.studentLogin = async (req, res) => {
  const { sid, password } = req.body;

  try {
    const student = await Student.findOne({ sid });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Student login successful",
      sid: student.sid
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Admin login successful",
      email: admin.email
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
