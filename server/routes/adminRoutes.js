const express = require('express');
const { loginController, userPanel, doctorpanel, doctorDetails, doctorVerify, userCount } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const {getImage} = require('../multer')
const router = express.Router();


router.post('/login',loginController)
router.get('/userpanel',authMiddleware,userPanel)
router.get('/doctorpanel',authMiddleware,doctorpanel)
router.get('/getdoctordetails/:id',authMiddleware,getImage,doctorDetails)
router.post('/doctorverify',authMiddleware,doctorVerify)
router.get('/docpatientcount',authMiddleware,userCount)

module.exports =router;