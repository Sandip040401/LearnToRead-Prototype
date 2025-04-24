import Book from '../models/book.js';
import Volume from '../models/volume.js';

export const createBook = async (req, res) => {
  try {
    const { title, volumeId, listening, speaking, reading, writing } = req.body;

    const volumeExists = await Volume.findById(volumeId);
    if (!volumeExists) return res.status(400).json({ message: 'Volume not found' });

    const book = await Book.create({
      title,
      volume: volumeId,
      listening,
      speaking,
      reading,
      writing
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('volume');
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
