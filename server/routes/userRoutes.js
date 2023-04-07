const express = require('express');
const { loginController, registerController, authController, googleRegisterController, existUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();



router.post('/login',loginController)
//this route handles register for user and doctor
router.post('/register',registerController)
router.post('/googleRegister',googleRegisterController)
router.post('/getUserData',authMiddleware, authController)
router.post('/existUser',existUser)


module.exports =router;