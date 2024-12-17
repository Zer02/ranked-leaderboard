import { defineStore } from "pinia";

export const useLeaderboardStore = defineStore("leaderboardStore", {
  state: () => ({
    players: [],
  }),

  getters: {
    rankedPlayers(state) {
      // Sort players by ELO in descending order
      return state.players.slice().sort((a, b) => b.elo - a.elo);
    },
  },

  actions: {
    loadPlayers() {
      const storedPlayers = localStorage.getItem("players");
      if (storedPlayers) {
        this.players = JSON.parse(storedPlayers);
      } else {
        this.generatePlayers();
      }
    },

    generatePlayers() {
      const adjectives = [
        "Fast",
        "Strong",
        "Brave",
        "Swift",
        "Clever",
        "Gentle",
        "Fierce",
        "Wise",
        "Noble",
        "Sly",
      ];
      const objects = [
        "Tiger",
        "Lion",
        "Eagle",
        "Wolf",
        "Bear",
        "Fox",
        "Hawk",
        "Panther",
        "Shark",
        "Dragon",
      ];

      adjectives.sort(() => Math.random() - 0.5);
      objects.sort(() => Math.random() - 0.5);

      this.players = Array.from({ length: 10 }, (_, index) => {
        const name = `${adjectives[index]} ${objects[index]}`;
        const startingElo = 1000;
        const matchesPlayed = Math.floor(Math.random() * 100);
        const wins = Math.floor(Math.random() * matchesPlayed);

        const elo = startingElo + matchesPlayed * 10 + wins * 20;
        const losses = matchesPlayed - wins;
        const winPercentage =
          matchesPlayed === 0 ? 0 : ((wins / matchesPlayed) * 100).toFixed(2);

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
      this.generatePlayers(); // Regenerate players
    
      // Create a new reference for players to ensure reactivity
      this.players = [...this.players]; // Spread operator creates a new array reference
    
      // Sync the changes with localStorage
      localStorage.setItem("players", JSON.stringify(this.players));
    },    

    simulateMatch() {
      if (!this.players || this.players.length < 2) {
        console.error("Not enough players to simulate a match.");
        return;
      }

      const playersCopy = [...this.players];
      playersCopy.sort(() => Math.random() - 0.5);

      const playedPlayers = new Set();

      playersCopy.forEach((player) => {
        if (playedPlayers.has(player)) {
          return;
        }

        let opponentIndex = Math.floor(Math.random() * playersCopy.length);
        while (
          playedPlayers.has(playersCopy[opponentIndex]) ||
          playersCopy[opponentIndex] === player
        ) {
          opponentIndex = Math.floor(Math.random() * playersCopy.length);
        }
        const opponent = playersCopy[opponentIndex];

        const playerWins = Math.random() < 0.5;

        const expectedScorePlayer =
          1 / (1 + 10 ** ((opponent.elo - player.elo) / 400));
        const expectedScoreOpponent =
          1 / (1 + 10 ** ((player.elo - opponent.elo) / 400));

        const kFactor = 50;
        player.elo = Math.round(
          player.elo + kFactor * ((playerWins ? 1 : 0) - expectedScorePlayer)
        );
        opponent.elo = Math.floor(
          opponent.elo +
            kFactor * ((playerWins ? 0 : 1) - expectedScoreOpponent)
        );

        player.matchesPlayed++;
        player.wins += playerWins ? 1 : 0;
        player.losses += playerWins ? 0 : 1;
        player.winPercentage = (
          (player.wins / player.matchesPlayed) *
          100
        ).toFixed(2);

        opponent.matchesPlayed++;
        opponent.wins += playerWins ? 0 : 1;
        opponent.losses += playerWins ? 1 : 0;
        opponent.winPercentage = (
          (opponent.wins / opponent.matchesPlayed) *
          100
        ).toFixed(2);

        playedPlayers.add(player);
        playedPlayers.add(opponent);
      });

      this.players = [...playersCopy]; // Update the state
      localStorage.setItem("players", JSON.stringify(this.players)); // Sync with localStorage
    },
  },
});
