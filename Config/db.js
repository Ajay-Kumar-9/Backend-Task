import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

//function to connectDB

export const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Error while Connecting DB", error.message);
  }
};
