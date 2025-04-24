import express from 'express';
import { createUser, createLevel } from '../controllers/adminController.js';

const router = express.Router();

// Admin routes
router.post('/create-user', createUser);
router.post('/create-level', createLevel);

export default router;
