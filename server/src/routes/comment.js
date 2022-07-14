const express = require('express')
const router = express.Router()
const { createComment, listComments } = require('../controllers/comment')
const { protect } = require('../middleware/auth')

router.route('/:id/comment').get(protect, listComments)
router.route('/:id/comment/create').post(protect, createComment)

module.exports = router