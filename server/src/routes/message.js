const express = require('express')
const router = express.Router()
const { getMessages, addMessage } = require('../controllers/message')
const { protect } = require('../middleware/auth')

router.route("/addmsg").post(addMessage)
router.route("/getmsg").post(protect, getMessages)

module.exports = router