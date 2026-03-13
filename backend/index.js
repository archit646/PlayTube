import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use()
app.use('/api/auth',authRouter)

app.listen(port, () => {
    console.log("Server Started")
    connectDB()
})