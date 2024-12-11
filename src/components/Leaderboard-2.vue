<template>
  <div class="leaderboard">
    <h2>Tennis League Leaderboard</h2>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>ELO</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in sortedPlayers" :key="player.id">
          <td>{{ index + 1 }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.elo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMatchStore } from '@/stores/matchStore'; // Ensure correct import path

export default defineComponent({
  name: 'Leaderboard2',
  computed: {
    // Access the player data from the match store
    players() {
      const matchStore = useMatchStore();
      return matchStore.players;
    },
    // Sort players by their ELO scores in descending order
    sortedPlayers() {
      return this.players.sort((a, b) => b.elo - a.elo);
    },
  },
});
</script>

<style scoped>
.leaderboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

table th {
  background-color: #007bff;
  color: white;
}

table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
