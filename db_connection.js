import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();


const dbConnection= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log("MongoDB connection error:",error)
    }
}

export default dbConnection;