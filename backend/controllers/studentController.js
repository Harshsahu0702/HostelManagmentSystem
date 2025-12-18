const StudentRegistration = require('../models/StudentRegistration');

// Register a new student
exports.registerStudent = async (req, res) => {
    try {
        const {
            fullName,
            rollNumber,
            email,
            phoneNumber,
            course,
            year,
            guardianName,
            relationship,
            guardianEmail,
            guardianPhone,
            preferredRoomType
        } = req.body;

        // Check if student with same email or roll number already exists
        const existingStudent = await StudentRegistration.findOne({
            $or: [
                { email },
                { rollNumber }
            ]
        });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Student with this email or roll number already exists.'
            });
        }

        // Create new student
        const newStudent = new StudentRegistration({
            fullName,
            rollNumber,
            email,
            phoneNumber,
            course,
            year,
            guardianName,
            relationship,
            guardianEmail,
            guardianPhone,
            preferredRoomType
        });

        await newStudent.save();

        // Don't send password back in response for security
       // const studentData = newStudent.toObject();
        //delete studentData.password;

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            data: studentData
        });

    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering student',
            error: error.message
        });
    }
};

// Get all students (for admin)
exports.getAllStudents = async (req, res) => {
    try {
        const students = await StudentRegistration.find({}, { password: 0 }); // Exclude passwords
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};
