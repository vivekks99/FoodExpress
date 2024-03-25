const fs = require('fs');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Menu = require('../models/menuModel');
const MenuItem = require('../models/menuItemModel');
const User = require('../models/userModel');

dotenv.config();

connectDB();

const menuData = JSON.parse(fs.readFileSync(`${__dirname}/menu.json`, 'utf-8'));
const menuItemData = JSON.parse(fs.readFileSync(`${__dirname}/menuItem.json`, 'utf-8'));
const userData = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
userData.map(i => i.password = bcrypt.hashSync(i.password, 12));

const importData = async () => {
    try{
        await Menu.deleteMany();
        await MenuItem.deleteMany();
        await User.deleteMany();

        await Menu.insertMany(menuData);
        await MenuItem.insertMany(menuItemData);
        await(User.insertMany(userData));
        
        process.exit();
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        await Menu.deleteMany();
        await MenuItem.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed');
        process.exit();
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}
else{
    importData();
}