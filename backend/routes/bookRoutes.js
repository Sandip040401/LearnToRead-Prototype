import express from 'express';
import { 
  createBook, 
  getAllBooks, 
  getBookById, 
  updateBook, 
  moveBookToAnotherVolume, 
  deleteBook,
  updateCoverImage,
  updateListeningVideo,
  updateSpeakingSection,
  updateWritingPdf
} from '../controllers/bookController.js';
import { dynamicUploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Create Book
router.post('/', createBook);

// Get All Books
router.get('/', getAllBooks);

// Get Book by ID
router.get('/:id', getBookById);

// Update Book
router.put('/:id', updateBook);

// Move Book to another Volume
router.put('/:id/move', moveBookToAnotherVolume);

// Delete Book
router.delete('/:id', deleteBook);

// ====== NEW Upload Routes ======
// Update Cover Image
router.put('/:id/cover-image', dynamicUploadMiddleware, updateCoverImage);

// Update Listening Video
router.put('/:id/listening-video', dynamicUploadMiddleware, updateListeningVideo);

// Update Speaking Section
router.put('/:id/speaking', dynamicUploadMiddleware, updateSpeakingSection);

// Update Writing PDF
router.put('/:id/writing-pdf', dynamicUploadMiddleware, updateWritingPdf);

export default router;
