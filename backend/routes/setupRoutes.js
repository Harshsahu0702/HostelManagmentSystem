const express = require("express");
const router = express.Router();
const { createHostelSetup } = require("../controllers/setupController");

// POST /api/setup/hostel-setup
router.post("/hostel-setup", createHostelSetup);

// simple health-check for the setup route
router.get("/hostel-setup", (req, res) => res.json({ message: "Hostel setup endpoint available" }));

module.exports = router;
