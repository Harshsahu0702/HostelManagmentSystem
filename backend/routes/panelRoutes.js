const express = require('express');
const router = express.Router();
const panel = require('../controllers/panelController');

// Notifications
router.get('/notifications/:studentId', panel.getNotificationsForStudent);

// Complaints
router.post('/complaints', panel.createComplaint);
router.get('/complaints/:studentId', panel.getComplaintsForStudent);

// Anti-ragging
router.post('/antiragging', panel.createAntiRagging);
router.get('/antiragging/:studentId', panel.getAntiRaggingForStudent);

// Mess menu
router.get('/mess/:hostelId', panel.getMessMenu);

// Departure
router.post('/departure', panel.createDeparture);
router.get('/departure/:studentId', panel.getDeparturesForStudent);

// Fees
router.get('/fees/:studentId', panel.getFeesForStudent);

// Chat
router.post('/chat', panel.postChatMessage);
router.get('/chat/:studentId', panel.getChatForStudent);

// Feedback
router.post('/feedback', panel.postFeedback);
router.get('/feedback/:studentId', panel.getFeedbackForStudent);

module.exports = router;
