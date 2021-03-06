const express = require('express')
const User = require('../models/user')


const homeNoLogin=async(req, res)=>{ res.render('home')}

const homeAfterLogin=async(req, res)=>{
    
    try{
    const user=await User.findById(req.params.id);
    if(user.isLoggedIn){
        res.render('userhome',{user:user})

    }else{
        res.redirect('/login')
    }
    }catch(error){
        console.log(error.message)
        res.redirect('/login')
    }

}



module.exports={
    
    homeNoLogin,
    homeAfterLogin

}
