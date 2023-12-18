import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import MessageCollection from "./Model/MessageModal.js";
import {
  saveMessage,
  getInitialMessages,
} from "./Controller/shareingpermission/messageModalCon.js";
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const connectDB = async () => {
  try {
    const conn = await connect(process.env.MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  }
};

app.use(json());
connectDB();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://secret-zone.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

import registerRoute from "./Routes/userRouts.js";
app.use("/api/todo", registerRoute);

// Socket IO Connection

// io.on("connection", async (socket) => {
//   try {
//     console.log(`${socket.id} connected`);
//     const initialMessages = await getInitialMessages();

//     io.emit("initialMessages", initialMessages);

//     socket.on("chatMessage", async (messageContent) => {
//       await saveMessage(socket.id, messageContent);
//     });
//   } catch (error) {
//     console.error("Socket connection error:", error);
//   }
// });

// httpServer.listen(5000);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
export { io };
