// server/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  approveBooking,
  declineBooking,
} = require('../controllers/bookingController');

const { protect, adminOnly, userOnly } = require('../middleware/authMiddleware');

// ✅ User-only routes
router.post('/', protect, userOnly, createBooking); // Book a car
router.get('/user/:userId', protect, userOnly, getUserBookings); // View own bookings
router.delete('/:id', protect, userOnly, cancelBooking); // Cancel own booking

// ✅ Admin-only routes
router.get('/', protect, adminOnly, getAllBookings); // View all bookings
router.patch('/:id/approve', protect, adminOnly, approveBooking); // Approve a booking
router.patch('/:id/decline', protect, adminOnly, declineBooking); // Decline a booking

module.exports = router;
