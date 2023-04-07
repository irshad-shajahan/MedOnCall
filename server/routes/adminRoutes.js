const express = require('express');
const { loginController, userPanel } = require('../controllers/adminController');
const router = express.Router();


router.post('/login',loginController)
router.get('/userpanel',userPanel)

module.exports =router;