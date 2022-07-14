const express = require('express')
const router = express.Router()
const { getAllDoubts, getDoubt, addDoubt, editDoubt, deleteDoubt } = require('../controllers/doubt')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getAllDoubts)
router.route('/').post(addDoubt)
router.route('/:id').get(protect, getDoubt).patch(editDoubt).delete(protect, deleteDoubt)

module.exports = router