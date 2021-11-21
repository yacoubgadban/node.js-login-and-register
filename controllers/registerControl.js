const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')  
const Joi = require('joi');

var localStorage = require('local-storage');


const GetRegister=async(req, res)=>{
    localStorage.remove('joiErrorR')
    const joiErrorR= await localStorage.get('joiErrorR')

    localStorage.remove('data')
    const data=await localStorage.get('data')
    res.render('register',{joiErrorR:joiErrorR ,data:data})
}

const RegisterFunc=async(req, res)=>{
    const schema =Joi.object({
            
        fname: Joi.string().alphanum().min(2).max(10).required(),
        lname: Joi.string().alphanum().min(2).max(10).required(),
        email: Joi.string().min(6).max(30).email({ minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(20).required(),
        password2: Joi.string().min(6).max(20).required(),

       
    })
    const  joiErrorR = schema.validate(req.body)
    const user=await User.findOne({email:req.body.email})

    if(joiErrorR.error){
        
        localStorage.set('joiErrorR',joiErrorR)  
        localStorage.set('data',req.body)   
        const data=await localStorage.get('data')            
        res.render('register',{joiErrorR:joiErrorR,data:data})
        }
       
    else if(req.body.password!=req.body.password2){

       localStorage.set('data',req.body)
       const data=await localStorage.get('data')            
       const joiErrorR= {error:{message:"Password is not same !"}}

       res.render('register',{joiErrorR:joiErrorR,data:data})


    }else if(user){
        localStorage.set('data',req.body)
        const data=await localStorage.get('data')            
        const joiErrorR= {error:{message:"This email is already created !"}}
        res.render('register',{joiErrorR:joiErrorR,data:data})

    }
    else{
        try{
            const user=new User({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                password:req.body.password,
                isLoggedIn:true
            });
            const saltRounds=10;
            const salt=await bcrypt.genSalt(saltRounds)
            user.password=await bcrypt.hash(user.password,salt);
            await user.save();
            res.redirect('/user/'+""+user._id+"")
        }catch(err){
            console.log(err.message)
            res.redirect('/register')
        }
    
    }
    
}



module.exports={
   
    GetRegister,
    RegisterFunc

}