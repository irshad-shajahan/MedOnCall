const express = require('express');
const { verifyExist, doctorProfileComplete } = require('../controllers/doctorController');
const router = express.Router();
const {uploadToS3} = require("../multer");

router.post('/existDoc',verifyExist)
router.post('/profilecomplete/:id',uploadToS3,doctorProfileComplete)
module.exports =router;