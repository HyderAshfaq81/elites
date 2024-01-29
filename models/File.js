import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

export default mongoose.models.File || mongoose.model('File', FileSchema);
