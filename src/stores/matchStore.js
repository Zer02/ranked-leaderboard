// src/stores/matchStore.js
import { defineStore } from "pinia";

export const useMatchStore = defineStore("matchStore", {
  state: () => ({
    players: [
      { id: 1, name: "Player 1", elo: 1500 },
      { id: 2, name: "Player 2", elo: 1450 },
      { id: 3, name: "Player 3", elo: 1600 },
      // Add more player objects as needed
    ],
  }),
  actions: {
    addPlayer(player) {
      this.players.push(player);
    },
    updateElo(id, newElo) {
      const player = this.players.find((p) => p.id === id);
      if (player) {
        player.elo = newElo;
      }
    },
  },
});
