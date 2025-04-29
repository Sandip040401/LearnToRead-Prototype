import Level from "../models/level.js";

// Create a new Level
export const createLevel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const level = new Level({ name, description });
    await level.save();
    res.status(201).json(level);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create level', error: error.message });
  }
};

// Get all Levels
export const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch levels', error: error.message });
  }
};

// Get single Level by ID
export const getLevelById = async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) return res.status(404).json({ message: 'Level not found' });
    res.status(200).json(level);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch level', error: error.message });
  }
};

// Update Level
export const updateLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!level) return res.status(404).json({ message: 'Level not found' });
    res.status(200).json(level);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update level', error: error.message });
  }
};

// Delete Level
export const deleteLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndDelete(req.params.id);
    if (!level) return res.status(404).json({ message: 'Level not found' });
    res.status(200).json({ message: 'Level deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete level', error: error.message });
  }
};
