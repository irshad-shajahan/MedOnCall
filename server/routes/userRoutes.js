const express = require('express');
const { loginController, registerController, authController, googleRegisterController, existUser, userPhoneAdd, doctorProfile, bookSlot, fetchAppointments } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getImage } = require('../multer');
const router = express.Router();



router.post('/login',loginController)
//this route handles register for user and doctor
router.post('/register',registerController)
router.post('/googleRegister',googleRegisterController)
router.get('/getUserData',authMiddleware, authController)
router.post('/existUser',existUser)
router.patch('/updatePhone',authMiddleware,userPhoneAdd)
router.get('/doctorProfile/:id',authMiddleware,getImage,doctorProfile)
router.post('/bookSlot',authMiddleware,bookSlot)
router.get('/fetchAppointments',authMiddleware,fetchAppointments)


module.exports =router;