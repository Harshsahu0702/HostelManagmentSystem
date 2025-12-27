const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

// Register a new student (PUBLIC – no JWT)
router.post("/register", studentController.registerStudent);

// Get all students (PROTECTED – admin/student with JWT)
router.get("/", authMiddleware, studentController.getAllStudents);

// Get single student by id (PROTECTED – JWT required)
router.get("/:id", authMiddleware, studentController.getStudentById);

module.exports = router;
