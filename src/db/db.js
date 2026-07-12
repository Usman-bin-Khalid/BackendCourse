require('dotenv').config();

const mongoose = require('mongoose');

async function connectDB() {
   await mongoose.connect(process.env.MONGO_URI, );
   // '/' is ky bd jo likhyn gyn wo database ka name hoga, agr database exist nhi krta to wo create ho jaye ga
   console.log('Connected to MongoDB');
}



module.exports = connectDB;