const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true,
            unique: true
        },
        endpoint: {
            type: String,
            required: true,
            unique: true
        }
    }
)

const MenuItem = mongoose.model('MenuItem', menuItemSchema)

module.exports = MenuItem;