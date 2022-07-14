const express = require('express')
const { createAnswer } = require('../controllers/answer')
const router = express.Router()
const { protect } = require('../middleware/auth')

router.route('/:id/answer/create').post(protect, createAnswer)

module.exports = router