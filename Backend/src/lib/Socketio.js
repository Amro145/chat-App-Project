const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}
const userSocketMap = {}; // {userId: socketId}
let socketID;
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  socketID = socket.id;
  if (userId) userSocketMap[userId] = socketID;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, server, app, getReceiverSocketId };
