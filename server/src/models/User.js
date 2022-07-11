const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a email address"],
        unique: true,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: 6,
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please enter your role"],
    }
})

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function() {
    return JWT.sign({ id: this._id}, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE 
    })
}

const User = mongoose.model("User", UserSchema)
module.exports = User