const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Register a new student
router.post('/register', studentController.registerStudent);

// Get all students (for admin)
router.get('/', studentController.getAllStudents);

module.exports = router;
