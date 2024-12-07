import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; // Your Firebase initialization file

// Save tournament data to Firestore
export async function saveTournament(courtId, players) {
  try {
    await setDoc(doc(db, "tournaments", courtId), { players });
    console.log(`Tournament data for court ${courtId} saved successfully.`);
  } catch (error) {
    console.error("Error saving tournament:", error);
  }
}

// Load tournament data from Firestore
export async function loadTournament(courtId) {
  try {
    const docSnap = await getDoc(doc(db, "tournaments", courtId));
    return docSnap.exists() ? docSnap.data().players : [];
  } catch (error) {
    console.error("Error loading tournament:", error);
    return [];
  }
}

// Subscribe to Firestore updates for live tournament data
export function onTournamentChange(courtId, callback) {
  return onSnapshot(doc(db, "tournaments", courtId), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().players);
    }
  });
}
