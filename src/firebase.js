// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSjT4OztmxzosSoeFAfw4s1FXdDyK8V-c",
  authDomain: "ranked-leaderboard.firebaseapp.com",
  projectId: "ranked-leaderboard",
  storageBucket: "ranked-leaderboard.firebasestorage.app",
  messagingSenderId: "1028231047574",
  appId: "1:1028231047574:web:6f70600f579edfb68615b7",
  measurementId: "G-ZJ8B46E0FM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
