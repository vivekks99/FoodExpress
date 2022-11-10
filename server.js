const mongoose = require("mongoose");
const connection = mongoose.connection;


require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require('express-session');
const flash = require("express-flash");
const MongoDbStore = require('connect-mongo')(session);



const app = express();

app.use(bodyparser.urlencoded({extended:true}));


let mongoStore =  new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})


app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}));

app.use(flash());

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/partials'));
app.use(express.static(__dirname + '/public'));


require('./routes/web')(app)

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
})