import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const promoteToAdmin = async (email) => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/Foodizs-Website`);

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: "admin" },
      { new: true }
    );

    if (user) {
      console.log(`✅ User ${email} promoted to admin!`);
      console.log("User details:", user);
    } else {
      console.log(`❌ User with email ${email} not found`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

const email = process.argv[2] || "anay@example.com"; // Change this or pass as argument
promoteToAdmin(email);
