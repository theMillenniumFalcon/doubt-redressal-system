const express = require('express')
const router = express.Router()
const { getUser } = require('../controllers/user')
const { protect } = require('../middleware/auth')

router.route('/:id').get(protect, getUser)

module.exports = router