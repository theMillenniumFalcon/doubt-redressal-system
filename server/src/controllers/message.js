const Message = require("../models/Message")

const getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body

        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 })

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message,
            }
        })
        res.status(200).json({ success: true, projectedMessages })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: message,
            users: [from, to],
            sender: from,
        })

        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    getMessages, addMessage
}