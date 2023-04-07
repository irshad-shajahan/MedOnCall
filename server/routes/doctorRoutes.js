const express = require('express');
const { verifyExist } = require('../controllers/doctorController');
const router = express.Router();

router.post('/existDoc',verifyExist)

module.exports =router;