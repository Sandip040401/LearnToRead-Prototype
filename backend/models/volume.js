import mongoose from 'mongoose';

const volumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  },
  { timestamps: true }
);

const Volume = mongoose.model('Volume', volumeSchema);

export default Volume;
