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
export default {
  data() {
    return {
      players: [],
    };
  },
  computed: {
    rankedPlayers() {
      // Sort players by ELO in descending order
      return this.players.slice().sort((a, b) => b.elo - a.elo);
    },
  },
  mounted() {
    this.loadPlayers();
  },
  methods: {
    loadPlayers() {
      const storedPlayers = localStorage.getItem("players");
      if (storedPlayers) {
        this.players = JSON.parse(storedPlayers);
      } else {
        this.generatePlayers();
      }
    },
    generatePlayers() {
      const adjectives = ["Fast", "Strong", "Brave", "Swift", "Clever", "Gentle", "Fierce", "Wise", "Noble", "Sly"];
      const objects = ["Tiger", "Lion", "Eagle", "Wolf", "Bear", "Fox", "Hawk", "Panther", "Shark", "Dragon"];

      adjectives.sort(() => Math.random() - 0.5);
      objects.sort(() => Math.random() - 0.5);

      this.players = Array.from({ length: 10 }, (_, index) => {
        const name = `${adjectives[index]} ${objects[index]}`;
        const startingElo = 1000;
        const matchesPlayed = Math.floor(Math.random() * 100);
        const wins = Math.floor(Math.random() * matchesPlayed);

        const elo = startingElo + matchesPlayed * 10 + wins * 20;
        const losses = matchesPlayed - wins;
        const winPercentage = matchesPlayed === 0 ? 0 : ((wins / matchesPlayed) * 100).toFixed(2);

        return {
          id: index + 1,
          name,
          elo,
          matchesPlayed,
          wins,
          losses,
          winPercentage,
        };
      });

      localStorage.setItem("players", JSON.stringify(this.players));
    },
    randomizePlayers() {
      this.generatePlayers();
    },
    simulateMatch() {
      const playersCopy = [...this.players];

      playersCopy.sort(() => Math.random() - 0.5);

      const playedPlayers = new Set();

      playersCopy.forEach((player) => {
        if (playedPlayers.has(player)) {
          return;
        }

        let opponentIndex = Math.floor(Math.random() * playersCopy.length);
        while (playedPlayers.has(playersCopy[opponentIndex]) || playersCopy[opponentIndex] === player) {
          opponentIndex = Math.floor(Math.random() * playersCopy.length);
        }
        const opponent = playersCopy[opponentIndex];

        const playerWins = Math.random() < 0.5;

        const expectedScorePlayer = 1 / (1 + 10 ** ((opponent.elo - player.elo) / 400));
        const expectedScoreOpponent = 1 / (1 + 10 ** ((player.elo - opponent.elo) / 400));

        const kFactor = 32;
        player.elo = Math.floor(player.elo + kFactor * ((playerWins ? 1 : 0) - expectedScorePlayer));
        opponent.elo = Math.floor(opponent.elo + kFactor * ((playerWins ? 0 : 1) - expectedScoreOpponent));

        player.matchesPlayed++;
        player.wins += playerWins ? 1 : 0;
        player.losses += playerWins ? 0 : 1;
        player.winPercentage = ((player.wins / player.matchesPlayed) * 100).toFixed(2);

        opponent.matchesPlayed++;
        opponent.wins += playerWins ? 0 : 1;
        opponent.losses += playerWins ? 1 : 0;
        opponent.winPercentage = ((opponent.wins / opponent.matchesPlayed) * 100).toFixed(2);

        playedPlayers.add(player);
        playedPlayers.add(opponent);
      });

      localStorage.setItem("players", JSON.stringify(this.players));
    },
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
