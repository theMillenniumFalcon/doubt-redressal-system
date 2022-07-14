const express = require('express')
const router = express.Router()
const { createComment, listAllComments, listComments } = require('../controllers/comment')
const { protect } = require('../middleware/auth')

router.route('/').get(listAllComments)
router.route('/:id/comments').get(protect, listComments)
router.route('/:id/comment/create').post(protect, createComment)

module.exports = router