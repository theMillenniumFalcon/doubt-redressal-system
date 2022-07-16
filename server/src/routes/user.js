const express = require('express')
const router = express.Router()
const { getUser, listAllUsers } = require('../controllers/user')
const { protect } = require('../middleware/auth')

router.route('/except/:id').get(protect, listAllUsers)
router.route('/:id').get(protect, getUser)

module.exports = router