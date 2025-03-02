import mongoose from 'mongoose'

// we dont use dotnv because we use --env-file=.env in package.json

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error(`Connection Failed: ${error.message}`);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;

