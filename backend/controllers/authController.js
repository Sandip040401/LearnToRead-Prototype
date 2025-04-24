import { firebaseAuth } from '../config/firebaseConfig.js';  // You don't need this if you're not using Firebase authentication for user creation
import User from '../models/user.js';
import admin from "firebase-admin";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

// Register new user
export const register = async (req, res) => {
  const { email, password, role , uid} = req.body;

  try {
    // Check if user exists in MongoDB
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in MongoDB
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      firebaseUID: uid,  // Set firebaseUID to null since you're not using Firebase for user creation
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Initialize Firebase Admin SDK (make sure you have service account credentials set up)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Ensure this points to your service account
  });
}

// Login user (using Firebase ID token for login)
export const login = async (req, res) => {
  const { idToken } = req.body;  // Get the idToken sent from the frontend

  try {
    // Verify the Firebase ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    // Check if user exists in MongoDB using the Firebase UID
    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Generate JWT token for your app (not Firebase)
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send JWT token to the frontend for further authentication
    res.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
