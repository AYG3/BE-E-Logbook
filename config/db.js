import mongoose from "mongoose";
import app from '../server.js';
import PORT from '../'


const PORT = 4444;
const mongoDBURI = 'mongodb+srv://gilbertayoku3:XZ3mZSCSLI8Jbnnm@cluster0.c997hrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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