const express = require('express')
const protect = require('../middlewares/authMiddleware')
const router = express.Router()
const {sendMessage } = require('../controllers/messagecontrollers')
const {allMessages } = require('../controllers/messagecontrollers')

//protect middleware so user should be logged in before accessingb these routes
router.route('/').post(protect,sendMessage)
//single chat fetch
router.route('/:chatId').get(protect,allMessages)
module.exports = router;