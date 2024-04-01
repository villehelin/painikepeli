<template>
    <div>
      <p>counter: {{ count }}</p>
      <p>Pisteet: {{ points }}</p>

      <div>
        <button @click="handleButtonClick" class="button">Paina</button>
      </div>



    </div>

    
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        count: null,
        points: null,
      };
    },
    created() {
        this.socket = io('http://localhost:3000');

        this.socket.emit('getPlayers');

        this.socket.on('players', (players) => {
            const player = players.find(player => player.socketId === this.socket.id);
            if (player) {
                this.points = player.points;
            }
        });

        this.socket.on('initialPoints', (points) => {
            this.points = points;
        });
    
        this.socket.on('counter', (count, player) => {
            this.count = count;
            if (this.socketId === player.socketId) {
                this.nextWin = 10 - count % 10;
            }
        });

    },
    methods: {
      handleButtonClick() {
        this.socket.emit('buttonClicked');
      }
    }
  };
  </script>