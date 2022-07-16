const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'A message cannnot be empty'],
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message