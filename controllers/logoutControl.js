const express = require('express')
const User = require('../models/user')



const logOut=async(req, res)=>{
    const user=await User.findById(req.params.id)
     user.isLoggedIn=false;
     await user.save();
     res.redirect('/')

}


module.exports={
    
    logOut,

}
