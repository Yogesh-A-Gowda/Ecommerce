import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import paymentRoutes from './routes/payment.route.js'
import couponRoutes from './routes/coupon.route.js'
import analyticsRoutes from './routes/analytics.route.js'
import cors from 'cors'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser())

// const corsOptions = {
//     origin: "http://localhost:5173", // Allow only your frontend origin
//     credentials: true, // Allow cookies
//   };
  
 app.use(cors());

const PORT = process.env.PORT || 5000;
app.use("/api/auth",authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/coupons',couponRoutes)
app.use('/api/payments',paymentRoutes)
app.use('/api/analytics',analyticsRoutes)

app.listen(PORT,()=>{
    console.log('Listening to Port at 5000');
    connectDB()
})