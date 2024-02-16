<!-- Leaderboard.vue -->

<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
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
        <tr v-for="(player, index) in players" :key="player.id">
          <td>{{ index + 1 }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.elo }}</td>
          <td>{{ player.matchesPlayed }}</td>
          <td>{{ player.wins }}</td>
          <td>{{ player.winPercentage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  methods: {
    closeLeaderboard() {
      this.$emit('close');
    },
    navigateToLeaderboard(courtName, players) {
      this.$router.push({ name: 'Leaderboard', params: { courtName }, props: { players } });
    }
  }
};
</script>

<style scoped>
.leaderboard {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  padding: 20px;
  overflow: auto;
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leaderboard-body table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-body th,
.leaderboard-body td {
  border: 1px solid #ccc;
  padding: 5px;
}

.leaderboard-body th {
  background-color: #f0f0f0;
}
</style>
