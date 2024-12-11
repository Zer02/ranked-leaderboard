import { db } from "../firebase"; // Import Firestore
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  writeBatch,
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

// Save updated player data to Firestore using batch writes
async function saveAllPlayers(courtId, players) {
  const batch = writeBatch(db);
  for (const [playerId, data] of Object.entries(players)) {
    const playerRef = doc(db, "courts", courtId, "players", playerId);
    batch.update(playerRef, {
      elo: data.rating,
      matchesPlayed: data.matchesPlayed,
    });
  }
  await batch.commit();
}

// Update ELO ratings using a proper ELO formula
function updateElo(winnerRating, loserRating) {
  const k = 32; // Adjustment factor
  const expectedWin = 1 / (1 + 10 ** ((loserRating - winnerRating) / 400));
  const ratingChange = k * (1 - expectedWin);
  return Math.round(ratingChange);
}

// Simulate matches for a specific court
export async function simulateMatchesForCourt(courtId, matchCount = 10) {
  const players = await fetchPlayers(courtId);
  const playerIds = Object.keys(players);

  for (let i = 0; i < playerIds.length; i++) {
    for (let j = i + 1; j < playerIds.length; j++) {
      const player1 = playerIds[i];
      const player2 = playerIds[j];

      // Simulate multiple matches between each pair
      for (let k = 0; k < matchCount; k++) {
        const winner = Math.random() < 0.5 ? player1 : player2;
        const loser = winner === player1 ? player2 : player1;

        // Update ratings using the ELO formula
        const ratingChange = updateElo(
          players[winner].rating,
          players[loser].rating
        );

        players[winner].rating += ratingChange;
        players[winner].matchesPlayed += 1;

        players[loser].rating -= ratingChange;
        players[loser].matchesPlayed += 1;
      }
    }
  }

  // Save updated data back to Firestore
  await saveAllPlayers(courtId, players);

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

// Watch leaderboard in real-time
export function watchLeaderboard(courtId, callback) {
  const playersRef = collection(db, "courts", courtId, "players");
  return onSnapshot(playersRef, (snapshot) => {
    const leaderboard = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({ id: doc.id, ...data });
    });
    leaderboard.sort((a, b) => b.elo - a.elo);
    callback(leaderboard);
  });
}
