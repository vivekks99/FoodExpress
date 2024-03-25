const express = require('express');
const { getOrderById } = require('../controllers/orderController');
const { protect } = require('../controllers/userController');

const router = express.Router();

router.route('/:orderId').get(protect, getOrderById);

module.exports = router;