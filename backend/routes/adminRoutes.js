const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Route to create a new admin
router.post("/create", adminController.createAdmin);

module.exports = router;