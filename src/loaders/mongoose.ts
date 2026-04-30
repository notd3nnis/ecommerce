import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/mydatabase";

export default async () => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
