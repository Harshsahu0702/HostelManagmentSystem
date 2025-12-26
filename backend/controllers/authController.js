const StudentRegistration = require("../models/StudentRegistration");
const Admin = require("../models/Admin");

// STUDENT LOGIN
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: "Email and password are required" 
    });
  }

  try {
    const student = await StudentRegistration.findOne({ email });

    if (!student) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Check if password matches (since we're storing plain text password)
    if (student.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Exclude password from the response
    const { password: _, ...studentData } = student.toObject();

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: studentData,
      redirect: '/student/dashboard' // Frontend should handle this redirect
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error during authentication" 
    });
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
