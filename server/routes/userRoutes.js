const express = require('express');
const { loginController, registerController, authController, googleRegisterController, existUser, userPhoneAdd } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();



router.post('/login',loginController)
//this route handles register for user and doctor
router.post('/register',registerController)
router.post('/googleRegister',googleRegisterController)
router.get('/getUserData',authMiddleware, authController)
router.post('/existUser',existUser)
router.patch('/updatePhone',authMiddleware,userPhoneAdd)


module.exports =router;