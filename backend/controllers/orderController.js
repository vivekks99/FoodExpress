const Order = require("../models/orderModel")
const catchAsync = require("../utils/catchAsync");
const handleError = require("../utils/handleError");

exports.createOrder = catchAsync( async (req, res, next) => {
    const userId = req.user._id.toString();
    const {name, cart, contact, deliveryAddress, totalOrderPrice, totalOrderQuantity, paymentMode} = req.body;

    if(!name || !contact || !deliveryAddress || !paymentMode){
        const err = handleError(400, 'Please provide all details before Checkout');
        return next(err);
    }

    let ordersArr = {};

    ordersArr = cart.map(item => {
        return {
            orderName: item.name,
            category: item.category,
            quantity: item.quantity,
            orderPrice: item.totalPrice
        }
    })

    const orderDetails = {
        userId,
        name,
        orders: ordersArr,
        totalOrderPrice,
        totalOrderQuantity,
        orderedAt: Date.now(),
        contact,
        deliveryAddress,
        paymentMode
    }

    const data = await Order.create(orderDetails);

    res.status(201).json({
        status: "success",
        results: data,
    })
})

exports.getUserOrders = catchAsync(async (req, res, next) => {
    const userId = req.user._id.toString();
    const data = await Order.find({userId}).sort({createdAt: -1});
    
    res.status(200).json({
        status: "success",
        results: data.length,
        data
    })
})

exports.getOrderById = catchAsync(async (req, res, next) => {
    const data = await Order.findById(req.params.orderId);

    if(data.userId !== req.user._id.toString()){
        const err = handleError(401, 'This order does not belong to you');
        return next(err);
    }
    res.status(200).json({
        status: "success",
        data
    })
})