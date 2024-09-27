import mongoose from "mongoose";
import app from '../server.js';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const mongoDBURI = process.env.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBURI);
        app.listen(PORT, ()=> {
            console.log("Checkers works")
        })
    } catch (error) {
        console.error('Checkers doesn\'t work')
    console.log(error)
    }
}

export default connectDB;