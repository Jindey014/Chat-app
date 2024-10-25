import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Mongoose database:" + conn.connection.host)
    } catch (error) {
        console.log("Error in connecting to database", error)
    }

}
export default connectDB