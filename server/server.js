import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
connectDB()
import productRouter from './routes/productRouter.js'

const app = express()

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.static("server/public"))
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter)

const port = process.env.PORT

app.listen(port, () => console.log(`Server is running at ${port}`))