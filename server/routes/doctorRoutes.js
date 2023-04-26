const express = require('express');
const { verifyExist, doctorProfileComplete, dutyToggle, checkDoc, fetchSpeciality } = require('../controllers/doctorController');
const router = express.Router();
const {uploadToS3} = require("../multer");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/existDoc',verifyExist)
router.post('/profilecomplete/:id',authMiddleware,uploadToS3,doctorProfileComplete);
router.get('/dutyon',authMiddleware,dutyToggle);
router.get('/getDocCheck',authMiddleware,checkDoc);
router.get('/fetchSpecialities',authMiddleware,fetchSpeciality);
// doc.get('/getActiveDoctors',authMiddleware,getDoctors)
module.exports =router;