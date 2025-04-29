import express from 'express';
import { 
  createVolume, 
  getAllVolumes, 
  getVolumeById, 
  updateVolume, 
  moveVolumeToAnotherLevel, 
  deleteVolume 
} from '../controllers/volumeController.js';

const router = express.Router();

// Create Volume
router.post('/', createVolume);

// Get All Volumes
router.get('/', getAllVolumes);

// Get Volume by ID
router.get('/:id', getVolumeById);

// Update Volume
router.put('/:id', updateVolume);

// Move Volume to another Level
router.put('/:id/move', moveVolumeToAnotherLevel);

// Delete Volume
router.delete('/:id', deleteVolume);

export default router;
