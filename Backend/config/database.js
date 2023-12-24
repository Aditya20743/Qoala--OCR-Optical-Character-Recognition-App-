const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' })

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


module.exports=connectDB;