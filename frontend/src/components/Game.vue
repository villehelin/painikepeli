<template>
    <div>
      <h1>Multiplayer Game</h1>
      <p>counter: {{ count }}</p>
      <p>Pisteet: {{ points }}</p>
      <p>Seuraavaan voittoon: {{ nextWin }}</p>
      <p>User: {{ socketId }}</p>

      <div>
        <button @click="handleButtonClick" :disabled="buttonDisabled">Paina</button>
        <button @click="resetPoints" v-if="buttonDisabled">Reset Points</button>
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
        nextWin: null,
        socketId: null,
        buttonDisabled: false
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

        this.socket.on('connect', () => {
            this.socketId = this.socket.id;
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

        this.socket.on('lose', () => {
          this.buttonDisabled = true;
        });

    },
    methods: {
      handleButtonClick() {
        this.socket.emit('buttonClicked');
      },
      resetPoints() {
        this.socket.emit('resetPlayer');
        this.buttonDisabled = false;
    }
    }
  };
  </script>