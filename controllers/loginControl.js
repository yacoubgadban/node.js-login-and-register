const express = require('express')
const User = require('../models/user')
const Joi = require('joi');
const bcrypt = require('bcrypt')  
var localStorage = require('local-storage');






const loginFunc=async(req, res)=>{
    const schema =Joi.object({
            
       
        email: Joi.string().min(6).max(30).email({ minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(20).required(),
       
    })
    const  joiError = schema.validate(req.body)


    const user = await User.findOne({email:req.body.email})

    if(joiError.error){
        
        localStorage.set('joiError',joiError)
        
        
    res.render('login',{joiError:joiError})
    }

   else if(!user){
       console.log('wrong email')
   res.redirect('/login')
   }
   const checkPassword=await bcrypt.compare(req.body.password ,user.password)

   if(!checkPassword)    
   {
       console.log('wrong password')
       res.redirect('/login')
   }else{
          
    user.isLoggedIn=true
       await user.save()
       console.log('success')
       res.redirect('/user/'+""+user._id+"")}
}
const GetLogin=async(req, res)=>{
    localStorage.remove('joiError')
    const joiError= localStorage.get('joiError')

    res.render('login',{joiError:joiError})
}
module.exports={
    GetLogin,
    loginFunc,
}