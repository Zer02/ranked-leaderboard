import { db } from "../firebase"; // Import Firestore
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

// Fetch players for a specific court from Firestore
async function fetchPlayers(courtId) {
  const playersRef = collection(db, "courts", courtId, "players");
  const snapshot = await getDocs(playersRef);
  const players = {};
  snapshot.forEach((doc) => {
    players[doc.id] = {
      rating: doc.data().elo,
      matchesPlayed: doc.data().matchesPlayed || 0, // Default to 0 if undefined
    };
  });
  return players;
}

// Save updated player data to Firestore
async function savePlayer(courtId, playerId, data) {
  const playerRef = doc(db, "courts", courtId, "players", playerId);
  await updateDoc(playerRef, {
    elo: data.rating,
    matchesPlayed: data.matchesPlayed,
  });
}

// Simulate matches for a specific court
export async function simulateMatchesForCourt(courtId) {
  const players = await fetchPlayers(courtId);

  const playerIds = Object.keys(players);
  for (let i = 0; i < playerIds.length; i++) {
    for (let j = i + 1; j < playerIds.length; j++) {
      const player1 = playerIds[i];
      const player2 = playerIds[j];

      // Simulate multiple matches between each pair
      for (let k = 0; k < 10; k++) {
        const winner = Math.random() < 0.5 ? player1 : player2;
        const loser = winner === player1 ? player2 : player1;

        // Update ratings (basic ELO logic)
        players[winner].rating += 10;
        players[winner].matchesPlayed += 1;

        players[loser].rating -= 10;
        players[loser].matchesPlayed += 1;
      }
    }
  }

  // Save updated data back to Firestore
  for (const playerId of playerIds) {
    await savePlayer(courtId, playerId, players[playerId]);
  }

  return players;
}

// Get leaderboard for a specific court
export async function getCourtLeaderboard(courtId) {
  const players = await fetchPlayers(courtId);
  return Object.entries(players)
    .map(([id, stats]) => ({
      id,
      rating: stats.rating.toFixed(2),
      matchesPlayed: stats.matchesPlayed,
    }))
    .sort((a, b) => b.rating - a.rating);
}
