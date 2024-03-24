 const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

count = 0;
initialPoints = 20;

io.on('connection', (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    socket.emit('initialPoints', initialPoints);

    socket.on('buttonClicked', () => {
        count++;

        console.log("counter: ", count);
        io.emit('counter', count);
    });
});



var PORT = process.env.PORT || 3000;

server.listen(PORT, () =>{ console.log("Server running on port" , PORT); });