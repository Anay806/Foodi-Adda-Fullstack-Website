import express from 'express';
import 'dotenv/config'
import connectDB from './database/db.js';
import userRoute from './Routes/userRoutes.js'
import productRoute from './Routes/productRoutes.js'
import cartRoute from './Routes/cartRoutes.js'
import orderRoutes from "./Routes/orderRoutes.js"
import cors from 'cors'




const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/orders', orderRoutes)

// my api  http://localhost:8000/api/v1/user/register

// Connect to Database first, then start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server Running on PORT :`, PORT)
    })
  } catch (error) {
    console.log("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
