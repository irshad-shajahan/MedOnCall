const express = require('express');
const { loginController, userPanel, doctorpanel, doctorDetails, doctorVerify, userCount, addSpeciality, getSpecialities, deleteSpeciality, paymentPanel, approvePayment } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const {getImage} = require('../multer')
const router = express.Router();


router.post('/login',loginController)
router.get('/userpanel',authMiddleware,userPanel)
router.get('/doctorpanel',authMiddleware,doctorpanel)
router.get('/getdoctordetails/:id',authMiddleware,getImage,doctorDetails)
router.post('/doctorverify',authMiddleware,doctorVerify)
router.get('/docpatientcount',authMiddleware,userCount)
router.post('/addSpeciality',authMiddleware,addSpeciality)
router.get('/getSpeciality',authMiddleware,getSpecialities)
router.get('/deleteSpeciality/:id',authMiddleware,deleteSpeciality)
router.get('/paymentPanel',authMiddleware,paymentPanel)
router.post('/approvePayment',authMiddleware,approvePayment)

module.exports =router;