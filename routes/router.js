const express = require('express') 
const router = express.Router();
const loginController=require('../controllers/loginControl') 
const registerController=require('../controllers/registerControl') 
const homeController=require('../controllers/homeControl') 
const logOutController=require('../controllers/logoutControl') 
const deleteController=require('../controllers/deleteControl') 



router.get('/register', registerController.GetRegister)
router.post('/register', registerController.RegisterFunc)

router.get('/login',loginController.GetLogin)
router.post('/login',loginController.loginFunc )

router.get('/', homeController.homeNoLogin)
router.get('/user/:id',homeController.homeAfterLogin )


router.post('/logout/:id',logOutController.logOut)

router.get('/delete-user/:id',deleteController.deleteUser)

module.exports = router