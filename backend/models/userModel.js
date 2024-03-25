const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: validator.isEmail
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        phone: {
            type: Number
        },
        address: {
            type: String
        }
        // passwordChangedAt: Date
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// userSchema.methods.changedPassword = async function(JWTTimestamp){
//     if(this.passwordChangedAt){
//         const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
//         return JWTTimestamp < changedTimestamp;
//     }
//     return false;
// }

const User = mongoose.model('User', userSchema);

module.exports = User;