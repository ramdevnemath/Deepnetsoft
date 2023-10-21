import mongoose from 'mongoose';

const connectDB = async ()=> {
    try {
        const dbUrl = process.env.MONGO_URI
        await mongoose.connect(dbUrl)
            console.log("Connected to mongoDB")
    } catch(error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

export default connectDB;