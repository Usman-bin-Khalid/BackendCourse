const { use } = require('react');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser (req , res) {
  const {username, email, password } = req.body;
    const user = await userModel.create({
      username, email , password
    });

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
    res.status(201).json({message : 'User Registered Successfully', user, token : token});
}

// Cookies Storage Aisi storage jahan pe data browser ke andar store hota h, aur wo data browser ke close hone pe bhi wapis aa jata h.

module.exports = {registerUser};