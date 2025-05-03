import mongoose from 'mongoose';

const readingPageSchema = new mongoose.Schema({
  template: { type: String, enum: ['words', 'sentence', 'background'] },
  sentence: { type: String },
  sentenceX: { type: Number },
  sentenceY: { type: Number },
  audio: {
    url: { type: String }
  },
  image: {
    url: { type: String },
    alt: { type: String }
  },
  wordButtons: [{
    id: { type: Number },
    x: { type: Number },
    y: { type: Number },
    audio: {
      url: { type: String }
    }
  }],
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
