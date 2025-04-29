import express from 'express';
import { 
  createLevel, 
  getAllLevels, 
  getLevelById, 
  updateLevel, 
  deleteLevel 
} from '../controllers/levelController.js';

const router = express.Router();

// Create Level
router.post('/', createLevel);

// Get All Levels
router.get('/', getAllLevels);

// Get Level by ID
router.get('/:id', getLevelById);

// Update Level
router.put('/:id', updateLevel);

// Delete Level
router.delete('/:id', deleteLevel);

export default router;
