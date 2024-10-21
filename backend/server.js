const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const userinfoRoutes = require("./routes/userinfo");
const addfriendRoutes = require("./routes/addfriend");

const { getConversationInfo, saveMessage } = require("./utils/handleMessage");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Integrate socket.io with HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = {};

function createRoomId(userId, friendId) {
  return [userId, friendId].sort().join("_"); // Sort to ensure same roomId for both users
}

// Handle socket.io events
io.on("connection", socket => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register_user", userId => {
    users[userId] = socket.id;
    console.log("User registered:", users);
  });

  socket.on("join_room", async data => {
    try {
      const { conversationId, friendId } = await getConversationInfo(
        data.senderId,
        data.receiver
      );
      const roomId = createRoomId(data.senderId, friendId.toString()); // Create unique room ID for both users

      socket.join(roomId); // Add the current user to the room
      console.log(`User ${data.senderId} joined room ${roomId}`);

      // Send a message to both users indicating they have joined the room
      io
        .to(roomId)
        .emit(
          "system_message",
          `You and ${data.receiver} are now in a private room.`
        );
    } catch (error) {
      console.error("Error joining room:", error);
    }
  });

  socket.on("send_private_message", async data => {
    try {
      console.log("Received message: ", data);
      const { conversationId, friendId } = await getConversationInfo(
        data.senderId,
        data.receiver
      );
      console.log("friendId:", friendId.toString());

      const roomId = createRoomId(data.senderId, friendId);
      console.log(
        `Message from ${data.senderId} to ${friendId} in room ${roomId}: ${data.message}`
      );

      await saveMessage(conversationId, data.senderId, friendId, data.message);

      socket.broadcast.to(roomId).emit("receive_private_message", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId]; // Remove disconnected user from the mapping
        break;
      }
    }
  });

  // socket.on('send_private_message', async (data) => {
  //   try {
  //     console.log('Received message: ', data);
  //     const { conversationId, friendId } = await getConversationInfo(data.senderId, data.receiver);
  //     console.log("friendId:", friendId.toString());
  //     const receiverSocketId = users[friendId];
  //     console.log("receiverSocketId:", receiverSocketId);
  //     await saveMessage(conversationId, data.senderId, friendId, data.message);

  //     if (receiverSocketId) {
  //       io.to(receiverSocketId).emit('receive_private_message', data);
  //     }

  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //   }
  // });

  // socket.on('disconnect', () => {
  //   console.log(`User disconnected: ${socket.id}`);
  //   // Remove the user from the mapping
  //   for (const [userId, socketId] of Object.entries(users)) {
  //     if (socketId === socket.id) {
  //       delete users[userId];
  //       break;
  //     }
  //   }
  // });

  // socket.on('send_message', async (data) => {
  //   try {
  //     console.log('Received message: ', data);
  //     const { conversationId, friendId } = await getConversationInfo(data.senderId, data.receiver);
  //     await saveMessage(conversationId, data.senderId, friendId, data.message);
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //   }
  //   io.emit('receive_message', data);
  // });

  // socket.on('disconnect', () => {
  //   console.log(`User disconnected: ${socket.id}`);
  // });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/userinfo", userinfoRoutes);
app.use("/api/addfriend", addfriendRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
