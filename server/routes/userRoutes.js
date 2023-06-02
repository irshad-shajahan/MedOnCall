const express = require('express');
const { loginController, registerController, authController, googleRegisterController, existUser, userPhoneAdd, doctorProfile, bookSlot, fetchAppointments, submitFeedback, downloadPrescription, updateProfile, consultationCount } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getImage } = require('../multer');
const { checkOutHelper, confirmBooking } = require('../controllers/paymentController');
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
router.post('/submitFeedback',authMiddleware,submitFeedback)
router.post('/create-checkout-session',authMiddleware,checkOutHelper)
router.get('/downloadPrescription/:appointmentId',authMiddleware,downloadPrescription)
router.patch('/updateProfile',authMiddleware,updateProfile)
router.get('/consultationCount',authMiddleware,consultationCount)


module.exports =router;