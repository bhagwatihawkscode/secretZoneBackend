import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema({ }, { strict: false, timestamps: true });

const NotificationCollection = mongoose.model(
  "Notification",
  NotificationSchema
);

export default NotificationCollection;
