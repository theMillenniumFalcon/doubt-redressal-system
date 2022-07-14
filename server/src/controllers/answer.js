const Doubt = require('../models/Doubt')
const Answer = require('../models/Answer')

const createAnswer = async (req, res, next) => {
    try {
        const doubtId = req.params.id
        const answerBody = new Answer({
            answer: req.body.answer,
            doubtId: doubtId,
            userId: req.user._id
        })
        
        const answer = await answerBody.save()

        await Doubt.updateOne(
            {_id: doubtId},
            {answer: answer._id}
        )
    
        res.status(200).json({ success: true, answer })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const listAllAnswers = async (req, res, next) => {
    try {
        const answers = await Answer.find().populate('userId')
        res.status(200).json({ success: true, answers })
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    createAnswer, listAllAnswers
}