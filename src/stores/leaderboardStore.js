// src/stores/leaderboardStore.js
import { defineStore } from "pinia";

export const useLeaderboardStore = defineStore("leaderboardStore", {
  state: () => ({
    players: [],
    surfaces: ["hard", "clay", "grass"], // Possible surfaces
  }),

  getters: {
    rankedPlayers(state) {
      // Sort players by Elo in descending order
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

      const surfaces = this.surfaces;

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
          surfacePreference:
            surfaces[Math.floor(Math.random() * surfaces.length)], // Random surface preference
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
      this.players = [...this.players]; // Ensure reactivity
      localStorage.setItem("players", JSON.stringify(this.players));
    },

    simulateMatch() {
      if (!this.players || this.players.length < 2) {
        console.error("Not enough players to simulate a match.");
        return;
      }

      const playersCopy = [...this.players];
      playersCopy.sort(() => Math.random() - 0.5); // Shuffle players randomly

      const playedPlayers = new Set();

      // Iterate over the players to pair them up
      for (let i = 0; i < playersCopy.length; i++) {
        const player = playersCopy[i];

        // Skip if this player has already played
        if (playedPlayers.has(player.id)) continue;

        // Find an opponent who hasn't played yet
        const opponentIndex = playersCopy.findIndex(
          (p, index) => index !== i && !playedPlayers.has(p.id)
        );

        if (opponentIndex === -1) {
          console.warn("Not enough opponents to form a match.");
          break;
        }

        const opponent = playersCopy[opponentIndex];

        // Determine match winner
        const playerWins = Math.random() < 0.5;

        // Calculate expected scores
        const expectedScorePlayer =
          1 / (1 + 10 ** ((opponent.elo - player.elo) / 400));
        const expectedScoreOpponent =
          1 / (1 + 10 ** ((player.elo - opponent.elo) / 400));

        // Adjust ELO using a K-factor
        const kFactor = 100;
        player.elo = Math.round(
          player.elo + kFactor * ((playerWins ? 1 : 0) - expectedScorePlayer)
        );
        opponent.elo = Math.round(
          opponent.elo +
            kFactor * ((playerWins ? 0 : 1) - expectedScoreOpponent)
        );

        // Update match stats
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

        // Mark both players as having played
        playedPlayers.add(player.id);
        playedPlayers.add(opponent.id);
      }

      // Update state and sync with localStorage
      this.players = [...playersCopy];
      localStorage.setItem("players", JSON.stringify(this.players));
    },
  },
});
