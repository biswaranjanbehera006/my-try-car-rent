const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // ✅ Import multer upload

router.get('/', getAllCars);
router.get('/:id', getCarById);

// Admin-only routes with image upload
router.post('/', protect, adminOnly, upload.single('image'), addCar);
router.put('/:id', protect, adminOnly, updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

module.exports = router;
