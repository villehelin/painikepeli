<template>

    <Notification />
    <div>
      <h1>Multiplayer Game</h1>
      <p>counter: {{ count }}</p>
      <p>Pisteet: {{ points }}</p>
      <p>Seuraavaan voittoon: {{ nextWin }}</p>
      <p>User: {{ socketId }}</p>

      <div class="button-container">
        <button @click="handleButtonClick" :disabled="buttonDisabled" class="button">Paina</button>
        <button @click="resetPoints" v-if="buttonDisabled" class="reset-button">Reset Points</button>
      </div>



    </div>

    <Leaderboard :players=this.players v-if="buttonDisabled"/>

    
  </template>
  
  <script>
  import io from 'socket.io-client';
  import Leaderboard from './Leaderboard.vue';
  import Notification from './Notification.vue'

  import { useStore } from '../store/store';
  
  export default {
    components: {
        Leaderboard,
        Notification
    },
    data() {
      return {
        count: null,
        points: null,
        nextWin: null,
        socketId: null,
        buttonDisabled: false,
        players: []
      };
    },
    created() {
      const store = useStore();

      this.socket = io('http://localhost:3000');

      this.socket.emit('getPlayers');

      this.socket.on('players', (players) => {
        this.players = players;

        const player = players.find(player => player.socketId === this.socket.id);
        if (player) {
            this.points = player.points;
        }
      });

      this.socket.on('connect', () => {
        this.socketId = this.socket.id;
      });

      this.socket.on('online', (socketId) => {
        const message = `${socketId} has joined the game`;
        store.triggerNotification(message, "lightgreen");
      });

      this.socket.on('offline', (socketId) => {
        const message = `${socketId} has left the game`;
        store.triggerNotification(message, "gray");
      });
  
      this.socket.on('counter', (count, player) => {
          this.count = count;
          if (this.socketId === player.socketId) {
              this.nextWin = 10 - count % 10;
          }
      });

      this.socket.on('lose', (player) => {
        if (this.socketId === player.socketId) {
          this.buttonDisabled = true;
          const message = `Uh-oh! ${player.socketId} lost the game. Keep your spirits up, there's always another chance!`;
          store.triggerNotification(message, "red"); 
        }
        else {
          const message = `Uh-oh! ${player.socketId} lost the game. Keep your spirits up, there's always another chance!`;
          store.triggerNotification(message, "yellow"); 
        }
      });

      this.socket.on('win', (player, points) => {  
        if (this.socketId === player.socketId) {
          const message = `🎉 Congratulations! Your click has earned you ${points} points! 🎉`;
          store.triggerNotification(message, "green");
        }
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

<style>
#app {
  text-align: center;
  margin-top: 20px;
}

.button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button[disabled] {
  background-color: #cccccc;
}

.button[disabled]:hover {
  background-color: #cccccc; 
}

.button:hover {
  background-color: #0056b3;
}

.reset-button {
  padding: 10px 20px;
  background-color: #dc3545; 
  color: #fff; 
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px; 
}

.reset-button:hover {
  background-color: #c82333; 
}
</style>
