const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  fromStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentRegistration' },
  to: String, // could be staff or general
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
