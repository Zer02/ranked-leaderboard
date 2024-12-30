// src/utils/simulation.js
import { recordMatch, playerRatings } from "./recordMatch";

// Initialize players and ratings
export function initializePlayers() {
  return {
    player1: { rating: 1200, volatility: 0.06, activity: 1 },
    player2: { rating: 1000, volatility: 0.06, activity: 1 },
    player3: { rating: 1100, volatility: 0.06, activity: 1 },
    player4: { rating: 1300, volatility: 0.06, activity: 1 },
    // Add more players as needed
  };
}

// Simulate matches for all players
export function simulateMatches(players) {
  // Update global playerRatings
  Object.assign(playerRatings, players);

  const playerKeys = Object.keys(playerRatings);
  for (let i = 0; i < playerKeys.length; i++) {
    for (let j = i + 1; j < playerKeys.length; j++) {
      const player1 = playerKeys[i];
      const player2 = playerKeys[j];
      for (let k = 0; k < 10; k++) {
        // Simulate 10 matches between each pair
        const winner = Math.random() < 0.5 ? player1 : player2;
        const loser = winner === player1 ? player2 : player1;
        recordMatch(winner, loser);
      }
    }
  }

  return playerRatings;
}

// Sort leaderboard
export function getLeaderboard() {
  return Object.entries(playerRatings)
    .map(([name, stats]) => ({
      name,
      rating: stats.rating.toFixed(2),
      wins: stats.activity, // Placeholder for wins
    }))
    .sort((a, b) => b.rating - a.rating);
}
