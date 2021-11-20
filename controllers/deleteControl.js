const express = require('express')
const { findById } = require('../models/user')
const User = require('../models/user')

const deleteUser=async(req, res)=>{
    
    const user=await User.findByIdAndDelete(req.params.id)
    .then((result)=>{res.redirect('/')})
    .catch(result=>{res.redirect('/')})
}

module.exports={
    
    deleteUser,

}