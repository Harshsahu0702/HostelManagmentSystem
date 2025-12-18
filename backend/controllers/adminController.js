const Admin = require("../models/Admin");

exports.createAdmin = async (req, res) => {
    try{
        const { email, password, name, phone, role, authorisation } = req.body;

        const exisitingAdmin =await Admin.findOne({ email });

        if (exisitingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin with this email already exists." 
            });
        }

        //creating a new admin
        const newAdmin = new Admin({
            email,
            password,
            name,
            phone,
            role,
            authorisation
        });

        await newAdmin.save();

        const adminData = newAdmin.toObject();
        delete adminData.password;

        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: adminData
        });

    }catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};