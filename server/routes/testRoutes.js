const express = require('express');
const router = express.Router();
const { sendTestEmail } = require('../controllers/testController');

// Test email GET route
router.get('/email', sendTestEmail);

module.exports = router;
