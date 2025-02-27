<template>
  <div class="leaderboard-popup">
    <!-- Court Name -->
    <h3>{{ courtName }}</h3>

    <!-- List of Players -->
    <ul>
      <li v-for="(user, index) in localRankings" :key="user.id">
        <!-- Rank, Name, and Score -->
        <span class="rank">{{ index + 1 }}.</span>
        <span class="name">{{ user.name }}</span>
        <span class="score">{{ user.score }}</span>
      </li>
    </ul>

    <!-- Optional: Button to View Full Leaderboard -->
    <button @click="viewFullLeaderboard" class="view-button">
      View Full Leaderboard
    </button>
  </div>
</template>

<script>
export default {
  props: {
    // Name of the court (passed from the parent component)
    courtName: {
      type: String,
      required: true,
    },
    // List of players and their scores (passed from the parent component)
    localRankings: {
      type: Array,
      required: true,
    },
    // Optional: Court ID (if you want to link to a full leaderboard)
    courtId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    // Emit an event to the parent component to handle navigation
    viewFullLeaderboard() {
      this.$emit('view-full-leaderboard', this.courtId);
    },
  },
};
</script>

<style scoped>
.leaderboard-popup {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 220px;
  font-family: Arial, sans-serif;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

.rank {
  font-weight: bold;
  margin-right: 10px;
  color: #555;
  width: 20px;
  /* Fixed width for rank */
}

.name {
  flex-grow: 1;
  color: #333;
}

.score {
  font-weight: bold;
  color: #007bff;
  width: 50px;
  /* Fixed width for score */
  text-align: right;
}

.view-button {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #0056b3;
}
</style>