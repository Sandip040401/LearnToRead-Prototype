import User from '../models/user.js';
import Level from '../models/level.js';
import Volume from '../models/volume.js';
import Book from '../models/book.js';

// Admin creates a new user
export const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const newUser = new User({
      email,
      password,
      role,
      firebaseUID: '',  // Admin will assign the Firebase UID after creating user on Firebase console
    });

    await newUser.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin creates a new level
export const createLevel = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newLevel = new Level({ name, description });
    await newLevel.save();
    res.status(201).json(newLevel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
