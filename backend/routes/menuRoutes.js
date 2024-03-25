const express = require('express');
const { getMenuById, getMenuByCategory, getAllMenu, getMenuItems } = require('../controllers/menuController');

const router = express.Router();

router.route('/').get(getMenuItems);
router.route('/all').get(getAllMenu);
router.route('/:category').get(getMenuByCategory);
router.route('/:category/:id').get(getMenuById);

module.exports = router;