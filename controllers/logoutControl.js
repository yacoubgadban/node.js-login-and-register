const express = require('express')
const app = express()
const User = require('../models/user')
const bcrypt = require('bcrypt')  
const router = express.Router();



const logOut=async(req, res)=>{
    const user=await User.findById(req.params.id)
     user.isLoggedIn=false;
     await user.save();
     res.redirect('/')

}


module.exports={
    
    logOut,

}
