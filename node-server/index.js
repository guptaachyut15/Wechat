const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const users = {};

io.on("connection", (socket) => {
  socket.on("user-joined", (name) => {
    users[socket.id] = name;
    console.log("************");
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (msg) => {
    socket.broadcast.emit("send", { name: users[socket.id], msg: msg });
  });
});

server.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
