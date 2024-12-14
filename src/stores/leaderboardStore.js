// src/stores/leaderboardStore.js
import { defineStore } from 'pinia';

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    players: [],
  }),
  getters: {
    rankedPlayers(state) {
      return state.players.slice().sort((a, b) => b.elo - a.elo);
    },
  },
  actions: {
    loadPlayers() {
      const storedPlayers = localStorage.getItem('players');
      if (storedPlayers) {
        this.players = JSON.parse(storedPlayers);
      } else {
        this.generatePlayers();
      }
    },
    generatePlayers() {
      const adjectives = ['Fast', 'Strong', 'Brave', 'Swift', 'Clever', 'Gentle', 'Fierce', 'Wise', 'Noble', 'Sly'];
      const objects = ['Tiger', 'Lion', 'Eagle', 'Wolf', 'Bear', 'Fox', 'Hawk', 'Panther', 'Shark', 'Dragon'];

      adjectives.sort(() => Math.random() - 0.5);
      objects.sort(() => Math.random() - 0.5);

      this.players = Array.from({ length: 10 }, (_, index) => {
        const name = `${adjectives[index]} ${objects[index]}`;
        const startingElo = 1000;
        const matchesPlayed = Math.floor(Math.random() * 100);
        const wins = Math.floor(Math.random() * matchesPlayed);

        const elo = startingElo + (matchesPlayed * 10) + (wins * 20);
        const losses = matchesPlayed - wins;
        const winPercentage = (matchesPlayed === 0 ? 0 : (wins / matchesPlayed) * 100).toFixed(2);

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

      localStorage.setItem('players', JSON.stringify(this.players));
    },
    randomizePlayers() {
      this.generatePlayers();
      localStorage.setItem('players', JSON.stringify(this.players));
    },
    simulateMatch() {
      const playersCopy = [...this.players];
      playersCopy.sort(() => Math.random() - 0.5);

      const playedPlayers = new Set();
      playersCopy.forEach((player) => {
        if (playedPlayers.has(player)) return;

        let opponentIndex = Math.floor(Math.random() * playersCopy.length);
        while (playedPlayers.has(playersCopy[opponentIndex]) || playersCopy[opponentIndex] === player) {
          opponentIndex = Math.floor(Math.random() * playersCopy.length);
        }
        const opponent = playersCopy[opponentIndex];

        let outcome = Math.random() < 0.5 ? 1 : 0;
        if (outcome === 0) outcome = 1;

        const expectedScorePlayer = 1 / (1 + 10 ** ((opponent.elo - player.elo) / 400));
        const expectedScoreOpponent = 1 / (1 + 10 ** ((player.elo - opponent.elo) / 400));

        const kFactor = 32;
        player.elo = Math.floor(player.elo + kFactor * (outcome - expectedScorePlayer));
        opponent.elo = Math.floor(opponent.elo + kFactor * ((1 - outcome) - expectedScoreOpponent));

        player.matchesPlayed++;
        player.wins += outcome;
        player.losses += 1 - outcome;
        player.winPercentage = ((player.wins / player.matchesPlayed) * 100).toFixed(2);

        opponent.matchesPlayed++;
        opponent.wins += 1 - outcome;
        opponent.losses += outcome;
        opponent.winPercentage = ((opponent.wins / opponent.matchesPlayed) * 100).toFixed(2);

        playedPlayers.add(player);
        playedPlayers.add(opponent);
      });

      localStorage.setItem('players', JSON.stringify(this.players));
    },
  },
});