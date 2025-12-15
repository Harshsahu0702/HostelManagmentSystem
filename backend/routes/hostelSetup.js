const express = require("express");
const router = express.Router();
const HostelSetup = require("../models/HostelSetup");

// SAVE / UPDATE DRAFT
router.post("/save-draft", async (req, res) => {
  try {
    const { step, data } = req.body;

    let setup = await HostelSetup.findOne({ status: "DRAFT" });

    if (!setup) setup = new HostelSetup();

    Object.assign(setup, data);
    setup.currentStep = step;
    setup.status = "DRAFT";

    await setup.save();

    res.json({ success: true, message: "Draft saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET DRAFT (resume setup)
router.get("/draft", async (req, res) => {
  try {
    const setup = await HostelSetup.findOne({ status: "DRAFT" });
    res.json(setup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FINAL SUBMIT
router.post("/complete", async (req, res) => {
  try {
    const setup = await HostelSetup.findOne({ status: "DRAFT" });

    if (!setup) {
      return res.status(400).json({ message: "No draft found" });
    }

    setup.status = "COMPLETED";
    await setup.save();

    res.json({
      success: true,
      message: "Hostel setup completed",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;