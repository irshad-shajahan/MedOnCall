const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { newConvo, getconvo, newMessage, getMessages, getSecondUser } = require('../controllers/communicationController');
const router = express.Router();

//new conv

router.post('/addConvo',authMiddleware,newConvo)
router.get('/fetchConvo',authMiddleware,getconvo)
router.post('/addMessage',authMiddleware,newMessage)
router.get('/getMessages/:conversationId',authMiddleware,getMessages)
router.get('/fetchSecondUser/:userId',authMiddleware,getSecondUser)

module.exports =router;
