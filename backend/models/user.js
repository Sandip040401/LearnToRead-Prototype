import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'teacher', 'student'], required: true },
    firebaseUID: { type: String, required: true }, // Firebase UID for authentication
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
