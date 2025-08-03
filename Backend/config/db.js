import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI, {
      dbName: 'CrowdSolve',
    });
    console.log("MongoDB connected");
  }
  catch (error) {
    console.log(error, "MongoDB connection failed!");
  }
};

export default connectDB;