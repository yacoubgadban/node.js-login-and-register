const express = require('express')
const app = express()
const User = require('./../models/user')
const bcrypt = require('bcrypt')  
const router = express.Router();
const loginController=require('../controllers/loginControl') 
const registerController=require('../controllers/registerControl') 
const homeController=require('../controllers/homeControl') 
const logOutController=require('../controllers/logoutControl') 




router.get('/register', registerController.GetRegister)
router.post('/register', registerController.RegisterFunc)

router.get('/login',loginController.GetLogin)
router.post('/login',loginController.loginFunc )

router.get('/', homeController.homeNoLogin)
router.get('/user/:id',homeController.homeAfterLogin )


router.post('/logout/:id',logOutController.logOut)

module.exports = router