import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import levelRoutes from './routes/levelRoutes.js';
import volumeRoutes from './routes/volumeRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { dynamicUploadMiddleware } from './middleware/uploadMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', authMiddleware, adminRoutes); // Admin routes protected
app.use('/api/levels', authMiddleware, levelRoutes);
app.use('/api/volumes', authMiddleware, volumeRoutes);
app.use('/api/books', authMiddleware, bookRoutes);

// Upload route
app.post("/upload", dynamicUploadMiddleware, (req, res) => {
    res.status(200).json({
      message: "File uploaded successfully!",
      fileUrl: req.fileUrl,
      fileType: req.fileType,
    });
  });


// Error handling middleware (catch-all)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
