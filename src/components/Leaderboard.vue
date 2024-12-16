<template>
  <div class="leaderboard">
    <div class="button-container">
      <button @click="simulateMatch" class="button">Simulate Match</button>
      <button @click="randomizePlayers" class="button">Randomize Players</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>ELO</th>
          <th>Matches Played</th>
          <th>Wins</th>
          <th>Win Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in rankedPlayers" :key="player.id" :class="{ highlight: index === 0 }">
          <td>{{ index + 1 }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.elo }}</td>
          <td>{{ player.matchesPlayed }}</td>
          <td>{{ player.wins }}</td>
          <td>{{ player.winPercentage }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLeaderboardStore } from '@/stores/leaderboardStore';

export default {
  setup() {
    const leaderboardStore = useLeaderboardStore();

    // Automatically load players when the component is mounted
    leaderboardStore.loadPlayers();

    return {
      rankedPlayers: leaderboardStore.rankedPlayers,
      simulateMatch: leaderboardStore.simulateMatch,
      randomizePlayers: leaderboardStore.randomizePlayers,
    };
  },
};
</script>

<style scoped>
.leaderboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.button-container {
  margin-bottom: 20px;
}

.button {
  padding: 10px 20px;
  background-color: #2aa15e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.button:hover {
  background-color: #007bff;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto;
}

thead {
  background-color: black;
  color: white;
}

th,
td {
  padding: 2px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: rgba(54, 50, 50, 0.835);
  color: white;
}

tr.highlight td {
  font-weight: bold;
  color: #e5ff00;
}
</style>
