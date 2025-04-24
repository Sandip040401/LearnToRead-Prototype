import mongoose from 'mongoose';

const readingPageSchema = new mongoose.Schema({
  type: { type: String, enum: ['paragraph', 'image', 'background-image', 'sentence'], required: true },
  text: String,
  audioUrl: String,
  imageUrl: String,
  backgroundUrl: String,
}, { _id: false });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  volume: { type: mongoose.Schema.Types.ObjectId, ref: 'Volume', required: true },

  listening: {
    videoUrl: { type: String }, // BunnyCDN video URL
  },
  speaking: {
    sentence: String,
    imageUrl: String
  },
  reading: {
    pages: [readingPageSchema]
  },
  writing: {
    pdfDownloadUrl: String, // Admin uploads for download
    studentUploads: [{ studentId: mongoose.Schema.Types.ObjectId, fileUrl: String }]
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
