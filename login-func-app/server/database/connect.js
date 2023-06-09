import mongoose from 'mongoose';
import ENV from '../config.js';
export const connectDB = async () => {
  const URL = ENV.MONGO_URI;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`db connected `);
  } catch (error) {
    console.log(error);
  }
};
