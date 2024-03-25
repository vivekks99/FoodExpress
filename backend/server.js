const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const menuRoutes = require('./routes/menuRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/user', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/orders', orderRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
}
else{
    app.get('/', (req, res) => {
        res.send('API is running...');
    })
}

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})