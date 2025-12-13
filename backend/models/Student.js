const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  sid: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
