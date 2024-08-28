const express = require('express');
const { sendMessage, createRoom, getRooms, getRoom, loadMessages } = require('../controller/messageController');
const { verifyUser } = require('../middleware/auth');
const router = express.Router()

router.route('/send-message').post( verifyUser, sendMessage)
router.route('/create-room').post( verifyUser, createRoom)
router.route('/rooms').get( verifyUser, getRooms)
router.route('/room/:roomId').get( verifyUser, getRoom)
router.route('/load-messages/:roomId').get( verifyUser, loadMessages)

module.exports = router;