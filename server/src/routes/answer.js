const express = require('express')
const { createAnswer, listAllAnswers } = require('../controllers/answer')
const router = express.Router()

router.route('/').get(listAllAnswers)
router.route('/:id/answer/create').post(createAnswer)

module.exports = router