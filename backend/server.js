import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import connectDB from './db/connectDB.js'

const app = express()
const PORT = process.env.PORT || 5000;


dotenv.config()
app.use(express.json())//to parse the icoming requests with JSON parloads frorm req.body
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, (req, res) => {
    connectDB()
    console.log(`Listening on port:${PORT}`)
})