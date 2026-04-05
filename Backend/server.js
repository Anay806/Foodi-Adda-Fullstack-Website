import express from 'express';
import 'dotenv/config'
import connectDB from './database/db.js';
import userRoute from './Routes/userRoutes.js'



const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use('/api/v1/user', userRoute)
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
