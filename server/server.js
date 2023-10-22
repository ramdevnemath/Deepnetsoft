import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
connectDB()
import productRouter from './routes/productRouter.js'

const app = express()

const corsOptions = {
    origin: "https://deepnetsoft-0lta.onrender.com",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.static("server/public"))
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use("/api/products", productRouter)

const port = process.env.PORT

app.listen(port, () => console.log(`Server is running at ${port}`))