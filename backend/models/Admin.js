const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  authorisation: {
    qrscans: { type: Boolean, default: false },
    manageStudents: { type: Boolean, default: false },
    manageAdmins: { type: Boolean, default: false },
    readStudents: { type: Boolean, default: false },
    menuUpdates: { type: Boolean, default: false },
  }
});

module.exports = mongoose.model("Admin", adminSchema);