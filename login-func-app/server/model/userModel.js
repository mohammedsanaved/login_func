import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please Provide Unique Username'],
    unique: [true, 'Username Exits'],
  },
  password: {
    type: String,
    required: [true, 'Please Provide Password'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please Provide valid email'],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  mobile: { type: Number },
  profile: { type: String },
});

export default mongoose.model.Users || mongoose.model('User', userSchema);
