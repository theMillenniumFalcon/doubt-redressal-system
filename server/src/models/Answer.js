const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, 'A answer cannnot be empty'],
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

const Answer = mongoose.model("Answer", AnswerSchema)
module.exports = Answer