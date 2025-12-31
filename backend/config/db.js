import mongoose from "mongoose";
import createDefaultAdmin from "../utils/createAdmin.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Create admin if not exists
    await createDefaultAdmin();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
