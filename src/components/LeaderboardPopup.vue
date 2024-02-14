<template>
  <div class="leaderboard-popup">
    <div class="leaderboard-header">
      <h3>Leaderboard</h3>
      <button @click="closeLeaderboard">Close</button>
    </div>
    <div class="leaderboard-body">
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
          <tr v-for="(player, index) in topPlayers" :key="player.id">
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
  </div>
</template>

<script>
export default {
  props: {
    topPlayers: {
      type: Array,
      required: true
    },
    showLeaderboardPopup: {
      type: Boolean,
      required: true
    },
    popupLatLng: {
      type: Object,
      required: true
    },
  },
  methods: {
    closeLeaderboard() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.leaderboard-popup {
  position: absolute;
  top: 50px;
  left: 50px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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
