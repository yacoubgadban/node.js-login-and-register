const express = require('express')
const app = express()
const User = require('../models/user')
const bcrypt = require('bcrypt')  
const router = express.Router();


const GetLogin=(req, res)=>{
    
    res.render('login')
}


const loginFunc=async(req, res)=>{
    
    const user = await User.findOne({email:req.body.email})
   if(!user){
       console.log('wrong email')
   res.redirect('/login')
   }
   else if (user && user.password!=req.body.password){
       console.log('wrong password')
       res.redirect('/login')
   }else{
       user.isLoggedIn=true
       await user.save()
       console.log('success')
       res.redirect('/user/'+""+user._id+"")}
}

module.exports={
    GetLogin,
    loginFunc,
}