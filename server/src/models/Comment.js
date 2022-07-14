const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'A comment cannnot be empty'],
    },
    doubtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doubt'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment