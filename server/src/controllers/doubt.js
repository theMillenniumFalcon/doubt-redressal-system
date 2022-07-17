const Doubt = require('../models/Doubt')
const User = require('../models/User')

const getAllDoubts = async (req, res, next) => {
    try {
        const doubts = await Doubt.find().populate('comments').populate('answer').populate('creatorId')
        res.status(200).json({ success: true, doubts })
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const getDoubt = async (req, res, next) => {
    try {
        const doubt = await Doubt.findById(req.params.id).populate('comments').populate('answer').populate('creatorId')
        res.status(200).json({ success: true, doubt })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const addDoubt = async (req, res, next) => {
    try {
        const doubtBody = new Doubt({
            title: req.body.title,
            description: req.body.description,
            creatorId: req.body.creatorId
        })
        
        const doubt = await doubtBody.save()

        await User.updateOne(
            {_id: req.body.creatorId},
            {
                $push: {
                    doubts: doubt._id
                }
            }
        )
    
        res.status(200).json({ success: true, doubt })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const deleteDoubt = async (req, res, next) => {
    const deleteDoubt = Doubt.findById(req.params.id)

    try {
        await deleteDoubt.remove()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = {
    getAllDoubts, getDoubt, addDoubt, deleteDoubt
}