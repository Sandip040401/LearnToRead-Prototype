import Book from "../models/book.js";
import Volume from "../models/volume.js";


// Create a new Book
export const createBook = async (req, res) => {
  try {
    const { title, volume, listening, speaking, reading, writing } = req.body;
    
    const foundVolume = await Volume.findById(volume);
    if (!foundVolume) return res.status(404).json({ message: 'Volume not found' });

    const book = new Book({
      title,
      volume: volume,
      listening,
      speaking,
      reading,
      writing,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
};

// Get all Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('volume');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// Get single Book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('volume');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book', error: error.message });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
};

// Move Book to another Volume
export const moveBookToAnotherVolume = async (req, res) => {
  try {
    const { newVolumeId } = req.body;
    
    const volume = await Volume.findById(newVolumeId);
    if (!volume) return res.status(404).json({ message: 'New Volume not found' });

    const book = await Book.findByIdAndUpdate(req.params.id, { volume: newVolumeId }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book moved successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move book', error: error.message });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
};


// Update Cover Image
export const updateCoverImage = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { coverImage: req.fileUrl }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Cover image updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cover image', error: error.message });
  }
};

// Update Listening Video
export const updateListeningVideo = async (req, res) => {
  try {
    // const { videoUrl } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'listening.videoUrl': req.fileUrl },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Listening video updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update listening video', error: error.message });
  }
};

// Update Speaking Section
export const updateSpeakingSection = async (req, res) => {
  try {
    const { sentence } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 
        'speaking.sentence': sentence,
        'speaking.imageUrl': req.fileUrl
      },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Speaking section updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update speaking section', error: error.message });
  }
};

// Update Writing PDF
export const updateWritingPdf = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'writing.pdfDownloadUrl': req.fileUrl },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Writing PDF updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update writing PDF', error: error.message });
  }
};
