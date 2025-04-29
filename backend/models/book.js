import mongoose from 'mongoose';

const readingPageSchema = new mongoose.Schema({
  type: { type: String, enum: ['paragraph', 'image', 'background-image', 'sentence']},
  text: String,
  audioUrl: String,
  imageUrl: String,
  backgroundUrl: String,
}, { _id: false });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  volume: { type: mongoose.Schema.Types.ObjectId, ref: 'Volume'}, // referencing Volume
  coverImage: String,
  listening: {
    videoUrl: { type: String },
  },
  speaking: {
    sentence: String,
    imageUrl: String,
  },
  reading: {
    pages: [readingPageSchema],
  },
  writing: {
    pdfDownloadUrl: String,
    studentUploads: [{ studentId: mongoose.Schema.Types.ObjectId, fileUrl: String }],
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
