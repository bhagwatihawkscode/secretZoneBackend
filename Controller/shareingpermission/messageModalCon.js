// controllers/messagesController.js

import MessageCollection from "../../Model/MessageModal.js";
import { insertOnePoProduct } from "../../Model/MessageModal.js";
import User from "../../Model/userModel.js";
import { io } from "../../index.js";
export const getInitialMessages = async () => {
  try {
    const messages = await MessageCollection.find()
      .sort({ createdAt: -1 })
      .limit(10);
    return messages.reverse();
  } catch (error) {
    throw error;
  }
};

export const saveMessage = async (userId, messageContent) => {
  try {
    // Fetch the user data using the user ID
    console.log(messageContent);
    const userData = await User.findById(messageContent.room);

    // Extract the username from the user data
    const username = userData ? userData.name : "Unknown User";

    // Create a new message with the username and content
    const newMessage = new MessageCollection({
      user: userId,
      username: username,
      content: messageContent.content,
      ownid: messageContent.room,
    });
    // Save the message to the database
    await newMessage.save();
    io.emit("chatMessage", newMessage);
  } catch (error) {
    throw error;
  }
};
