const express = require("express");
const { signup, login, protect, profile, logout, updateProfile } = require("../controllers/userController");
const { createOrder, getUserOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/profile').get(protect, profile).patch(protect, updateProfile);
router.route('/logout').post(logout);
router.route('/orders').get(protect, getUserOrders).post(protect, createOrder);

module.exports = router;