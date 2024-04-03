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

let count = 0;
let initialPoints = 20;
let players = [];

io.on('connection', (socket) => {
    console.log("A user connected", socket.id);

    io.emit('online', socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      players = players.filter(player => player.socketId !== socket.id);

      io.emit('offline', socket.id);
    });

    //adds new player to the player array
    players.push({ socketId: socket.id, points: initialPoints });

    //main fucntionality is called when clicking button on client
    socket.on('buttonClicked', () => {
      //adds +1 to counter
      count++;
      
      //find player that clicked the button
      const player = players.find(player => player.socketId === socket.id);

      //console.log("counter: ", count);
      io.emit('counter', count, player);
      
      
      //removes one point from player that pressed button
      player.points--;

      //calculates if player won any prices and updates player array and sends it to client
      if (count % 500 === 0) {
          if (player) {
              player.points += 250;
          }
          io.emit('players', players);
          io.emit('win', player, 250);
      }
      else if (count % 250 === 0) {
          if (player) {
              player.points += 40;
          }
          io.emit('players', players);
          io.emit('win', player, 40);
      }
      else if (count % 10 === 0) {
          if (player) {
              player.points += 5;
          }
          io.emit('players', players);
          io.emit('win', player, 5);
      }
      else
        io.emit('players', players);

      //if player has no more points left send that the player has lost to the client
      if (player.points === 0) {
        io.emit('lose', player);
      }

  });

  //send player array to client when it is asked
  socket.on('getPlayers', () => {
    io.emit('players', players);
  });

  //player has no points left so he can reset points to the start state of the game
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