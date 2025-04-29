import Level from "../models/level.js";
import Volume from "../models/volume.js";

// Create a new Volume
export const createVolume = async (req, res) => {
  try {
    const { name, level } = req.body;
    
    const foundLevel = await Level.findById(level);
    if (!foundLevel) return res.status(404).json({ message: 'Level not found' });

    const volume = new Volume({ name, level: foundLevel._id });
    await volume.save();
    res.status(201).json(volume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create volume', error: error.message });
  }
};

// Get all Volumes
export const getAllVolumes = async (req, res) => {
  try {
    const volumes = await Volume.find().populate('level');
    res.status(200).json(volumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch volumes', error: error.message });
  }
};

// Get single Volume by ID
export const getVolumeById = async (req, res) => {
  try {
    const volume = await Volume.findById(req.params.id).populate('level');
    if (!volume) return res.status(404).json({ message: 'Volume not found' });
    res.status(200).json(volume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch volume', error: error.message });
  }
};

// Update Volume
export const updateVolume = async (req, res) => {
  try {
    const volume = await Volume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!volume) return res.status(404).json({ message: 'Volume not found' });
    res.status(200).json(volume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update volume', error: error.message });
  }
};

// Move Volume to another Level
export const moveVolumeToAnotherLevel = async (req, res) => {
  try {
    const { newLevelId } = req.body;
    
    const level = await Level.findById(newLevelId);
    if (!level) return res.status(404).json({ message: 'New Level not found' });

    const volume = await Volume.findByIdAndUpdate(req.params.id, { level: newLevelId }, { new: true });
    if (!volume) return res.status(404).json({ message: 'Volume not found' });

    res.status(200).json({ message: 'Volume moved successfully', volume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move volume', error: error.message });
  }
};

// Delete Volume
export const deleteVolume = async (req, res) => {
  try {
    const volume = await Volume.findByIdAndDelete(req.params.id);
    if (!volume) return res.status(404).json({ message: 'Volume not found' });
    res.status(200).json({ message: 'Volume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete volume', error: error.message });
  }
};
