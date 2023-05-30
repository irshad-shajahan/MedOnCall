const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { newConvo, getconvo, newMessage, getMessages, getSecondUser, endSession, getAgoraToken } = require('../controllers/communicationController');
const { generateRtcToken } = require('../Agora/TokenGeneration');
const router = express.Router();

//new conv

router.post('/addConvo',authMiddleware,newConvo)
router.get('/fetchConvo',authMiddleware,getconvo)
router.post('/addMessage',authMiddleware,newMessage)
router.get('/getMessages/:conversationId',authMiddleware,getMessages)
router.get('/fetchSecondUser/:userId',authMiddleware,getSecondUser)
router.patch('/endConvo',authMiddleware,endSession)
router.get('/generateToken/:appointmentId',authMiddleware,generateRtcToken,getAgoraToken)

module.exports =router;
