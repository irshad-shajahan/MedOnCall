const express = require('express');
const { verifyExist, doctorProfileComplete, dutyToggle, checkDoc, fetchSpeciality, fetchDoctors, updateLeave, fetchLeave, removeLeave, updateTimeSlot, fetchTimeSlots, fetchAppointments, submitPrescription } = require('../controllers/doctorController');
const router = express.Router();
const {uploadToS3} = require("../multer");
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/existDoc',verifyExist)
router.post('/profilecomplete/:id',authMiddleware,uploadToS3,doctorProfileComplete);
router.get('/dutyon',authMiddleware,dutyToggle);
router.get('/getDocCheck',authMiddleware,checkDoc);
router.get('/fetchSpecialities',authMiddleware,fetchSpeciality);
router.get('/fetchDoctors/:speciality',authMiddleware,fetchDoctors)
router.post('/updateLeave',authMiddleware,updateLeave)
router.get('/fetchLeaveDates',authMiddleware,fetchLeave)
router.patch('/removeLeave',authMiddleware,removeLeave)
router.patch('/updateTimeSlot',authMiddleware,updateTimeSlot)
router.get('/fetchTimeSlot',authMiddleware,fetchTimeSlots)
router.get('/fetchAppointments',authMiddleware,fetchAppointments)
router.post('/submitPrescription',authMiddleware,submitPrescription)

module.exports =router;