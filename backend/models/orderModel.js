const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        orders: [
            {
                orderName: {
                    type: String,
                    required: true
                },
                category: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                orderPrice: {
                    type: Number,
                    required: true
                },

            }
        ],
        totalOrderPrice: {
            type: Number,
            required: true
        },
        totalOrderQuantity: {
            type: Number,
            required: true
        },
        orderedAt: {
            type: Date,
            required: true
        },
        contact: {
            type: Number,
            required: true
        },
        deliveryAddress: {
            type: String,
            required: true
        },
        paymentMode: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;