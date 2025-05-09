import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

const Level = mongoose.model('Level', levelSchema);

export default Level;
