const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/stats', roomController.getRoomStats);

module.exports = router;
