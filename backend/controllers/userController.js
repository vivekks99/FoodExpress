const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const handleError = require("../utils/handleError");

const signToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions)

    res.status(statusCode).json({
        status: 'success',
        userDetails: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        const err = handleError(400, 'Please provide all the inputs');
        return next(err);
    }

    const userExist = await User.findOne({email});

    if(userExist){
        const err = handleError(400, 'User already exists');
        return next(err);
    }

    const newUser = await User.create({
        name,
        email,
        password
    });

    createSendToken(newUser, 201, res);
})

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        const err = handleError(400, 'Email or Password is not provided');
        return next(err);
    }

    const user = await User.findOne({email});

    if(!user || !await user.matchPassword(password)){
        const err = handleError(401, 'Invalid Email or Password');
        return next(err);
    }

    createSendToken(user, 201, res);
})

exports.profile = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        userDetails: req.user
    })
})

exports.updateProfile = catchAsync(async(req, res, next) => {
    const {name, phone, address} = req.body;
    const userId = req.user._id.toString();
    console.log(userId)

    await User.findByIdAndUpdate(userId, {
        name,
        phone,
        address 
    });

    res.status(200).json({
        status: "Profile Successfully Updated"
    })
})

exports.logout = catchAsync(async (req, res, next) => {
    res.clearCookie('jwt');

    res.status(200).json({
        message: 'Logged Out Successfully'
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    
    if(!token){
        const err = handleError(401, 'You should be logged in to access this page');
        return next(err);
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        const err = handleError(401, 'The user belonging to this token no longer exists');
        return next(err);
    }

    // if(currentUser.changedPassword(decoded.iat)){
    //     const err = handleError(401, 'User recently changed password! Please login again.');
    //     return next(err);
    // }

    req.user = currentUser;
    next();
})