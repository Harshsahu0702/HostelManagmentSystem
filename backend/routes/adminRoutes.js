const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔓 PUBLIC — only for initial hostel setup
router.post("/create-super-admin", adminController.createSuperAdmin);

// 🔐 PROTECTED — normal admin creation
router.post("/create", authMiddleware, adminController.createAdmin);

// 🔐 Get admin profile
router.get("/:email", authMiddleware, adminController.getAdminByEmail);

module.exports = router;
