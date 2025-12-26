const StudentRegistration = require('../models/StudentRegistration');

// Register a new student
exports.registerStudent = async (req, res) => {
    try {
        const {
            fullName,
            rollNumber,
            email,
            phoneNumber,
            address,
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

        // Create new student with phone number as password
        const newStudent = new StudentRegistration({
            fullName,
            rollNumber,
            email,
            phoneNumber,
            address,
            course,
            year,
            guardianName,
            relationship,
            guardianEmail,
            guardianPhone,
            preferredRoomType,
            password: phoneNumber // Using phone number as password
        });

        await newStudent.save();

        
        const studentData = newStudent.toObject();
        

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

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentRegistration.findById(id, { password: 0 }); // exclude password
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        console.error('Error fetching student by id:', error);
        res.status(500).json({ success: false, message: 'Error fetching student', error: error.message });
    }
};
