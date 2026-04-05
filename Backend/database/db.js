import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/Foodizs-Website`)
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Mongo DB Connection Failed: ", error);
    throw error; // Throw error so server doesn't start without DB
  }
}

export default connectDB;