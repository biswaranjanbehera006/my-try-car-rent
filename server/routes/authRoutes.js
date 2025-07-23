const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword, // ✅ Import this too
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword); // ✅ Email verification
router.post('/reset-password', resetPassword);   // ✅ New password set directly

module.exports = router;
