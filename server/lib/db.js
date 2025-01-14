import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDB  = async () => {
    try{

        await mongoose.connect(process.env.DB_URL).then(()=> {
            console.log("MongoDB connected");
        })
    }

    catch(e){
        console.log("Error connecting to MongoDB ",e.message)
        process.exit(1)
    }
}