import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({}, { strict: false, timestamps: true });

const MessageCollection = mongoose.model("messages", MessageSchema);

export default MessageCollection;
export const insertOnePoProduct = async (args = {}) => {
  try {
    const result = await PoProductTable.create(args);
    return result;
  } catch (error) {
    return null; // You might want to handle errors more appropriately
  }
};
