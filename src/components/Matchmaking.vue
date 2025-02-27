<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Tennis ELO Matchmaker</h1>

      <!-- Add Player Form -->
      <div class="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Add New Player</h2>
        <div class="flex gap-4">
          <input type="text" v-model="newPlayerName" placeholder="Enter player name"
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button @click="addPlayer"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Add Player
          </button>
        </div>
      </div>

      <!-- Match Recording -->
      <div v-if="selectedPlayer1 && selectedPlayer2" class="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Record Match</h2>
        <div class="flex items-center justify-between">
          <div class="text-center">
            <p class="font-medium">{{ selectedPlayer1.name }}</p>
            <p class="text-sm text-gray-500">ELO: {{ selectedPlayer1.elo }}</p>
            <button @click="recordMatch(selectedPlayer1.id)"
              class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Winner
            </button>
          </div>
          <div class="text-2xl font-bold text-gray-400">VS</div>
          <div class="text-center">
            <p class="font-medium">{{ selectedPlayer2.name }}</p>
            <p class="text-sm text-gray-500">ELO: {{ selectedPlayer2.elo }}</p>
            <button @click="recordMatch(selectedPlayer2.id)"
              class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Winner
            </button>
          </div>
        </div>
      </div>

      <!-- Players List -->
      <div class="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Players</h2>
        <div class="grid gap-4">
          <div v-for="player in players" :key="player.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium">{{ player.name }}</p>
              <p class="text-sm text-gray-500">
                ELO: {{ player.elo }} | Matches: {{ player.matches }}
              </p>
            </div>
            <button @click="suggestMatch(player)" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Find Match
            </button>
          </div>
        </div>
      </div>

      <!-- Match History -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Recent Matches</h2>
        <div class="grid gap-4">
          <div v-for="match in matches" :key="match.id" class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <span :class="{ 'font-bold': match.winner === match.player1.id }">
                {{ match.player1.name }}
              </span>
              <span class="text-gray-500">vs</span>
              <span :class="{ 'font-bold': match.winner === match.player2.id }">
                {{ match.player2.name }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              {{ new Date(match.date).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: [
        { id: 1, name: "John Doe", elo: 1500, matches: 0 },
        { id: 2, name: "Jane Smith", elo: 1400, matches: 0 },
      ],
      matches: [],
      newPlayerName: "",
      selectedPlayer1: null,
      selectedPlayer2: null,
    };
  },
  methods: {
    calculateNewElo(playerElo, opponentElo, won) {
      const K = 32;
      const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
      const actualScore = won ? 1 : 0;
      return Math.round(playerElo + K * (actualScore - expectedScore));
    },
    findBestMatch(player) {
      if (this.players.length < 2) return null;
      return this.players
        .filter((p) => p.id !== player.id)
        .reduce((closest, current) => {
          const currentDiff = Math.abs(current.elo - player.elo);
          const closestDiff = Math.abs(closest.elo - player.elo);
          return currentDiff < closestDiff ? current : closest;
        });
    },
    addPlayer() {
      if (!this.newPlayerName.trim()) return;
      const newPlayer = {
        id: this.players.length + 1,
        name: this.newPlayerName,
        elo: 1200,
        matches: 0,
      };
      this.players.push(newPlayer);
      this.newPlayerName = "";
    },
    recordMatch(winnerId) {
      if (!this.selectedPlayer1 || !this.selectedPlayer2) return;

      const newMatch = {
        id: this.matches.length + 1,
        player1: this.selectedPlayer1,
        player2: this.selectedPlayer2,
        winner: winnerId,
        date: new Date().toISOString(),
      };

      this.players = this.players.map((player) => {
        if (player.id === this.selectedPlayer1.id) {
          return {
            ...player,
            elo: this.calculateNewElo(
              player.elo,
              this.selectedPlayer2.elo,
              player.id === winnerId
            ),
            matches: player.matches + 1,
          };
        }
        if (player.id === this.selectedPlayer2.id) {
          return {
            ...player,
            elo: this.calculateNewElo(
              player.elo,
              this.selectedPlayer1.elo,
              player.id === winnerId
            ),
            matches: player.matches + 1,
          };
        }
        return player;
      });

      this.matches.unshift(newMatch);
      this.selectedPlayer1 = null;
      this.selectedPlayer2 = null;
    },
    suggestMatch(player) {
      const bestMatch = this.findBestMatch(player);
      if (bestMatch) {
        this.selectedPlayer1 = player;
        this.selectedPlayer2 = bestMatch;
      }
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS or custom styles here */
</style>