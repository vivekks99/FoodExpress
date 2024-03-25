const MenuItem = require("../models/menuItemModel");
const Menu = require('../models/menuModel');
const catchAsync = require("../utils/catchAsync");

exports.getMenuItems = catchAsync(async (req, res, next) => {
    const data = await MenuItem.find();
    res.status(200).json({
        status: 'success',
        results: data.length,
        data
    })
})

exports.getAllMenu = catchAsync(async (req, res, next) => {
    const data = await Menu.find();
    res.status(200).json({
        status: "success",
        results: data.length,
        data
    })
})

exports.getMenuByCategory = catchAsync(async (req, res, next) => {
    const data = await Menu.find({category: req.params.category});
    res.status(200).json({
        status: "success",
        results: data.length,
        data
    })
})

exports.getMenuById = catchAsync(async (req, res, next) => {
    const data = await Menu.find({ $and: [{ category: req.params.category }, { _id: req.params.id }] });

    res.status(200).json({
        status: "success",
        data
    })
})