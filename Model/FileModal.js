import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema({}, { strict: false, timestamps: true });

const FileCollection = mongoose.model("FileEntries", FileSchema);

export default FileCollection;
