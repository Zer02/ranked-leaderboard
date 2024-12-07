<template>
  <div class="leaderboard">
    <!-- <h2>Leaderboard</h2> -->
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
          <!-- <th>Losses</th> -->
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
          <!-- <td>{{ player.losses }}</td> -->
          <td>{{ player.winPercentage }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { saveTournament, loadTournament, onTournamentChange } from '../firebaseUtils';

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
  async mounted() {
    // // Retrieve players data from local storage or generate new data if it doesn't exist
    // this.loadPlayers();
    const savedPlayers = await loadTournament(this.courtId);
    if (savedPlayers.length > 0) {
      this.players = savedPlayers;
    } else {
      this.generatePlayers(); // Generate players if no data exists
      await saveTournament(this.courtId, this.players); // Save initial players to Firestore
    }

    // Listen for updates from Firestore
    this.unsubscribe = onTournamentChange(this.courtId, (updatedPlayers) => {
      this.players = updatedPlayers;
    });
  },
  methods: {
    showPlayerPopup(player) {
      this.$emit('show-player-popup', player);
    },
    loadPlayers() {
      // Load players from local storage or generate new data
      const storedPlayers = localStorage.getItem('players');
      if (storedPlayers) {
        this.players = JSON.parse(storedPlayers);
      } else {
        this.generatePlayers();
      }
    },
    generatePlayers() {
      // Unique adjectives and objects for random names
      const adjectives = ['Fast', 'Strong', 'Brave', 'Swift', 'Clever', 'Gentle', 'Fierce', 'Wise', 'Noble', 'Sly'];
      const objects = ['Tiger', 'Lion', 'Eagle', 'Wolf', 'Bear', 'Fox', 'Hawk', 'Panther', 'Shark', 'Dragon'];

      // Shuffle the arrays to ensure randomness
      adjectives.sort(() => Math.random() - 0.5);
      objects.sort(() => Math.random() - 0.5);

      // Generate 10 random players
      this.players = Array.from({ length: 10 }, (_, index) => {
        const name = `${adjectives[index]} ${objects[index]}`;
        const startingElo = 1000; // Starting ELO
        const matchesPlayed = Math.floor(Math.random() * 100); // Random matches played between 0 and 100
        const wins = Math.floor(Math.random() * matchesPlayed); // Random wins between 0 and matchesPlayed

        // Calculate ELO based on matches played and wins
        const elo = startingElo + (matchesPlayed * 10) + (wins * 20);

        const losses = matchesPlayed - wins; // Calculate losses
        const winPercentage = (matchesPlayed === 0 ? 0 : (wins / matchesPlayed) * 100).toFixed(2); // Calculate win percentage

        return {
          id: index + 1,
          name: name,
          elo: elo,
          matchesPlayed: matchesPlayed,
          wins: wins,
          losses: losses,
          winPercentage: winPercentage,
        };
      });
      // Save players data to local storage
      localStorage.setItem('players', JSON.stringify(this.players));
    },
    randomizePlayers() {
      // Randomize players data
      this.generatePlayers();
      // Save new players data to local storage
      localStorage.setItem('players', JSON.stringify(this.players));
    },
    async simulateMatch() {
      // Create a copy of players array to avoid modifying the original array
      const playersCopy = [...this.players];

      // Shuffle the players array to ensure randomness
      playersCopy.sort(() => Math.random() - 0.5);

      // Keep track of players who have already played in the current round
      const playedPlayers = new Set();

      // Simulate matches
      playersCopy.forEach((player) => {
        if (playedPlayers.has(player)) {
          return; // Skip if player has already played in the current round
        }

        // Find an opponent for the player
        let opponentIndex = Math.floor(Math.random() * playersCopy.length);
        while (playedPlayers.has(playersCopy[opponentIndex]) || playersCopy[opponentIndex] === player) {
          opponentIndex = Math.floor(Math.random() * playersCopy.length);
        }
        const opponent = playersCopy[opponentIndex];

        // Ensure there is always a winner
        let outcome = Math.random() < 0.5 ? 1 : 0; // 50% chance of player winning, 50% chance of opponent winning
        if (outcome === 0) {
          outcome = 1; // Change outcome to 1 (player wins) if it's 0 (opponent wins)
        }

        // Calculate expected scores
        const expectedScorePlayer = 1 / (1 + 10 ** ((opponent.elo - player.elo) / 400));
        const expectedScoreOpponent = 1 / (1 + 10 ** ((player.elo - opponent.elo) / 400));

        // Update ELO based on match outcome
        const kFactor = 32; // Adjust this for desired sensitivity to score changes
        player.elo = Math.floor(player.elo + kFactor * (outcome - expectedScorePlayer));
        opponent.elo = Math.floor(opponent.elo + kFactor * ((1 - outcome) - expectedScoreOpponent));

        // Update other stats (matches played, wins, losses, win percentage)
        player.matchesPlayed++;
        player.wins += outcome;
        player.losses += 1 - outcome;
        player.winPercentage = ((player.wins / player.matchesPlayed) * 100).toFixed(2);

        opponent.matchesPlayed++;
        opponent.wins += 1 - outcome;
        opponent.losses += outcome;
        opponent.winPercentage = ((opponent.wins / opponent.matchesPlayed) * 100).toFixed(2);

        // Add players to the set of played players
        playedPlayers.add(player);
        playedPlayers.add(opponent);

      });

      // Your logic to simulate and update ELO rankings
      this.updatePlayersAfterMatch(); 

      // Save the updated players list
      await saveTournament(this.courtId, this.players);

      // Save updated players data to local storage
      localStorage.setItem('players', JSON.stringify(this.players));
    }
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
