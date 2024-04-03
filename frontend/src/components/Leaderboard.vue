<template>
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Socket ID</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in sortedPlayers" :key="index">
            <td>{{ player.socketId }}</td>
            <td>{{ player.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      players: Array
    },
    computed: {
        sortedPlayers() {
            return this.players.slice().sort((a, b) => b.points - a.points);
        }
    }
  };
  </script>

<style>

table {
  margin: 0 auto;
}
</style>
