const mongoose = require("mongoose");

const studentRegistrationSchema = new mongoose.Schema({
  // Student Information
  fullName: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  
  // Guardian Information
  guardianName: { type: String, required: true },
  relationship: { type: String, required: true },
  guardianEmail: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  
  // Hostel Preference
  preferredRoomType: { type: String, required: true },
  
  // System Fields
  registrationDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  
  // Additional Fields
  roomAllocated: { type: String, default: '' }
  // Password field has been removed as per requirement
});

module.exports = mongoose.model("StudentRegistration", studentRegistrationSchema);
