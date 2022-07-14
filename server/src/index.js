require('dotenv').config()
const express = require('express')
const connectDB = require('./db/db')
const authRoute = require('./routes/auth')
const doubtRoute = require('./routes/doubt')
const commentRoute = require('./routes/comment')
const userRoute = require('./routes/user')
const errorHandler = require('./middleware/error')
const { checkUser } = require('./middleware/checkUser')
const cors = require("cors")
const { PORT } = require('./config/config')
const corsOptions = {
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

const main = async () => {
    connectDB()
    const app = express()
    app.use(express.json())
    app.use(cors(corsOptions))

    app.get('/', checkUser)
    
    app.use('/api/auth', authRoute)
    app.use('/api/doubt', doubtRoute)
    app.use('/api/doubt', commentRoute)
    app.use('/api/user', userRoute)

    app.use(errorHandler)

    const server = app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})