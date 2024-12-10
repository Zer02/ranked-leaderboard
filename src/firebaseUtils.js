import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

// Fetch players for a specific court
export const fetchCourtPlayers = async (courtName) => {
  try {
    const courtRef = doc(db, "courts", courtName);
    const courtSnap = await getDoc(courtRef);

    if (courtSnap.exists()) {
      return courtSnap.data().players.sort((a, b) => b.elo - a.elo); // Sort by ELO descending
    } else {
      // Create court if it doesn't exist
      await setDoc(courtRef, { players: [] });
      return [];
    }
  } catch (error) {
    console.error("Error fetching court players:", error);
    return [];
  }
};

// Add a player to a specific court
export const addPlayerToCourt = async (courtName, player) => {
  try {
    const courtRef = doc(db, "courts", courtName);
    const courtSnap = await getDoc(courtRef);

    if (courtSnap.exists()) {
      const existingPlayers = courtSnap.data().players;
      existingPlayers.push(player);
      await setDoc(courtRef, { players: existingPlayers });
    } else {
      await setDoc(courtRef, { players: [player] });
    }
  } catch (error) {
    console.error("Error adding player to court:", error);
  }
};
