const express = require('express')
const User = require('../models/user')
const Joi = require('joi');
const bcrypt = require('bcrypt')  
var localStorage = require('local-storage');




const GetLogin=async(req, res)=>{
    localStorage.remove('joiError')

    const joiError=await localStorage.get('joiError')

    localStorage.remove('data')
    const data=await localStorage.get('data')
    
    res.render('login',{joiError:joiError,data:data})
}

const loginFunc=async(req, res)=>{
    
    const schema =Joi.object({
            
       
        email: Joi.string().min(6).max(30).email({ minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(20).required(),
       
    })
    const  joiError = schema.validate(req.body)


    if(joiError.error){
        
    localStorage.set('joiError',joiError)
   localStorage.set('data',req.body)   
   const data=await localStorage.get('data')

    res.render('login',{joiError:joiError,data:data})

    }
    const user = await User.findOne({email:req.body.email})

     if(!user){

   localStorage.set('data',req.body)   
   const data=await localStorage.get('data')
   const joiError= {error:{message:"Email or Password is not correct !"}}
    res.render('login',{joiError:joiError,data:data})

  }
   
    const checkPassword=await bcrypt.compare(req.body.password ,user.password)
   if(!checkPassword)    
   {
    localStorage.set('data',req.body)   
    const data=await localStorage.get('data')
    const joiError= {error:{message:"Email or Password is not correct !"}}

    res.render('login',{joiError:joiError,data:data})
   }
            else{
                    
                user.isLoggedIn=true
                await user.save()
                res.redirect('/user/'+""+user._id+"")
                }
}



module.exports={
    GetLogin,
    loginFunc,
}