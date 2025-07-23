const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// ✅ Create a new booking (User only)
exports.createBooking = async (req, res) => {
  try {
    const { car, pickupDateTime, returnDateTime } = req.body;
    const userId = req.user.userId;

    const booking = new Booking({
      user: userId,
      car,
      pickupDateTime,
      returnDateTime,
      status: 'pending',
    });
    await booking.save();

    const user = await User.findById(userId);
    const bookedCar = await Car.findById(car);

    await sendEmail({
      to: user.email,
      subject: '📥 Booking Request Submitted',
      html: `
        <h3>Booking Request Submitted</h3>
        <p>Dear ${user.name},</p>
        <p>Your request to book <strong>${bookedCar.make} ${bookedCar.model}</strong> 
        from <strong>${new Date(pickupDateTime).toLocaleString()}</strong> 
        to <strong>${new Date(returnDateTime).toLocaleString()}</strong> is pending admin approval.</p>
        <p>We’ll notify you once it’s approved or declined.</p>
      `
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// ✅ Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// ✅ Get bookings for a specific user (User or Admin)
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.role !== 'admin' && req.user.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookings = await Booking.find({ user: userId }).populate('car');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
  }
};

// ✅ Cancel booking (User or Admin)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    await booking.deleteOne();

    await sendEmail({
      to: booking.user.email,
      subject: '❌ Booking Cancelled',
      html: `
        <h3>Booking Cancelled</h3>
        <p>Dear ${booking.user.name},</p>
        <p>Your booking for <strong>${booking.car.make} ${booking.car.model}</strong> 
        from <strong>${new Date(booking.pickupDateTime).toLocaleString()}</strong> 
        to <strong>${new Date(booking.returnDateTime).toLocaleString()}</strong> has been cancelled.</p>
      `
    });

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

// ✅ Admin approves a booking
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'approved';
    await booking.save();

    await sendEmail({
      to: booking.user.email,
      subject: '✅ Booking Approved',
      html: `
        <h3>Booking Approved</h3>
        <p>Dear ${booking.user.name},</p>
        <p>Your booking for <strong>${booking.car.make} ${booking.car.model}</strong> 
        from <strong>${new Date(booking.pickupDateTime).toLocaleString()}</strong> 
        to <strong>${new Date(booking.returnDateTime).toLocaleString()}</strong> has been approved by admin.</p>
      `
    });

    res.json({ message: 'Booking approved', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error approving booking', error: error.message });
  }
};

// ✅ Admin declines a booking
exports.declineBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'declined';
    await booking.save();

    await sendEmail({
      to: booking.user.email,
      subject: '🚫 Booking Declined',
      html: `
        <h3>Booking Declined</h3>
        <p>Dear ${booking.user.name},</p>
        <p>Your booking request for <strong>${booking.car.make} ${booking.car.model}</strong> 
        from <strong>${new Date(booking.pickupDateTime).toLocaleString()}</strong> 
        to <strong>${new Date(booking.returnDateTime).toLocaleString()}</strong> was declined by admin.</p>
      `
    });

    res.json({ message: 'Booking declined', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error declining booking', error: error.message });
  }
};
