const express = require('express')
const router = express.Router()
const { createComment, listAllComments, listComments } = require('../controllers/comment')
const { protect } = require('../middleware/auth')

router.route('/').get(listAllComments)
router.route('/:id/comments').get(protect, listComments)
router.route('/comment/create').post(createComment)

module.exports = router