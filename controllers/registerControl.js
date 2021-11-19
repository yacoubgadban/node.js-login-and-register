const express = require('express')
const app = express()
const User = require('../models/user')
const bcrypt = require('bcrypt')  
const router = express.Router();


const GetRegister=(req, res)=>{
    
    res.render('register')
}

const RegisterFunc=async(req, res)=>{
    
    const user=await User.findOne({email:req.body.email})
    if(req.body.password!=req.body.password2){

       console.log('err')


    }else if(user){
        console.log('user is already ')
        res.redirect('/register')

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