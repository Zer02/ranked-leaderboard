import { defineStore } from "pinia";
import { ref } from "vue";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; // Adjust the path as needed

export const usePlayerStore = defineStore("player", () => {
  const players = ref([]); // Reactive array to store player data
  const topPlayers = ref([]); // Reactive array to store top players

  // Fetch players from Firestore
  async function fetchPlayers() {
    try {
      const querySnapshot = await getDocs(collection(db, "players"));
      players.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      calculateTopPlayers();
    } catch (error) {
      console.error("Error fetching players: ", error);
    }
  }

  // Calculate top players based on ELO
  function calculateTopPlayers() {
    topPlayers.value = players.value
      .sort((a, b) => b.elo - a.elo) // Sort by ELO in descending order
      .slice(0, 10); // Take the top 10 players
  }

  // Simulate a match and update player ELO (example)
  function simulateMatch(player1, player2, winner) {
    // Update player ELOs based on the match result
    const updatedPlayers = players.value.map((player) => {
      if (player.id === player1.id) {
        return {
          ...player,
          elo: player.elo + (winner === player1.id ? 10 : -10),
        };
      }
      if (player.id === player2.id) {
        return {
          ...player,
          elo: player.elo + (winner === player2.id ? 10 : -10),
        };
      }
      return player;
    });

    players.value = updatedPlayers;
    calculateTopPlayers(); // Recalculate top players after the match
  }

  return {
    players,
    topPlayers,
    fetchPlayers,
    simulateMatch,
  };
});
