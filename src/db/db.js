const mongoose = require('mongoose');

async function connectDB() {
   await mongoose.connect('mongodb+srv://usmanbinkhalidpk_db_user:ILwjuljgNgC1d5tj@cluster0.n7bfj84.mongodb.net/halley');
   // '/' is ky bd jo likhyn gyn wo database ka name hoga, agr database exist nhi krta to wo create ho jaye ga
   console.log('Connected to MongoDB');
}



module.exports = connectDB;