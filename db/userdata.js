const express = require("express");
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb://localhost:27017/userdata",{useNewUrlParser:true},{useUnifiedTopology:true}).then(()=>{
    console.log('Database connected successfully');
}).catch(()=>{
    console.log("Error");
})

const userSchema = {
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}


const RegisteredUser = mongoose.model("RegisteredUser",userSchema);

module.exports = RegisteredUser;