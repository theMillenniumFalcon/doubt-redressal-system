const Doubt = require('../models/Doubt')

const getAllDoubts = async (req, res, next) => {
    try {
        const doubts = await Doubt.find()
        res.status(200).json({ success: true, doubts })
        next()
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const getDoubt = async (req, res, next) => {
    try {
        const doubt = await Doubt.findById(req.params.id)
        res.status(200).json({ success: true, doubt })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const addDoubt = async (req, res, next) => {
    const newDoubt = new Doubt(req.body)

    try {
        const savedDoubt = await newDoubt.save()
        res.status(200).json({ success: true, savedDoubt })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const editDoubt = async (req, res, next) => {
    try {
        const id = req.params.id
        const updates = req.body
        const options = {new: true}

        const editedDoubt = await Doubt.findByIdAndUpdate(id, updates, options)

        res.status(200).json({ success: true, editedDoubt })
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
    getAllDoubts, getDoubt, addDoubt, editDoubt, deleteDoubt
}