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
let players = [];

io.on('connection', (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    socket.emit('initialPoints', initialPoints);
    players.push({ socketId: socket.id, points: initialPoints });

    socket.on('buttonClicked', () => {
      count++;
      
      const player = players.find(player => player.socketId === socket.id);

      console.log("counter: ", count);
      io.emit('counter', count, player);
      

      player.points--;

      if (count % 500 === 0) {
          if (player) {
              player.points += 250;
          }
          io.emit('players', players);
      }
      else if (count % 250 === 0) {
          if (player) {
              player.points += 40;
          }
          io.emit('players', players);
      }
      else if (count % 10 === 0) {
          if (player) {
              player.points += 5;
          }
          io.emit('players', players);
      }
      else
        io.emit('players', players);

      if (player.points === 0) {
        io.emit('lose', player);
      }

  });

  socket.on('getPlayers', () => {
    io.emit('players', players);
  });

  socket.on('resetPlayer', () => {
    const player = players.find(player => player.socketId === socket.id);
    if (player) {
        player.points = initialPoints;
    }
    io.emit('players', players, socket.id);
})


});



var PORT = process.env.PORT || 3000;

server.listen(PORT, () =>{ console.log("Server running on port" , PORT); });