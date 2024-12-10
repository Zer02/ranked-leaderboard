<template>
  <div>
    <div id="map"></div>
    <LeaderboardPopup v-if="showLeaderboardPopup" :topPlayers="topPlayers" @close="closeLeaderboardPopup" />
  </div>
</template>

<script>
import L from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you correctly import your Firebase setup here
import LeaderboardPopup from "../components/LeaderboardPopup.vue";

export default {
  data() {
    return {
      map: null,
      showLeaderboardPopup: false,
      players: [], // Player data fetched from Firestore
      topPlayers: [], // Top players for leaderboard
      courts: [
        { coords: [40.87801390008082, -73.87783907227765], name: "Oval Park Tennis Courts" },
        { coords: [40.89086962874917, -73.8928386675601], name: "Van Cortlandt Park Tennis Courts" },
        { coords: [40.92609570209264, -73.87923773969872], name: "Tibbetts Brook Park Tennis Courts" },
        { coords: [40.89595441574829, -73.87932418934814], name: "Indian Field Tennis Courts" },
        { coords: [40.84028258650481, -73.89492174552299], name: "Crotona Park Tennis Center" },
        { coords: [40.84980841358763, -73.82318750318782], name: "Pelham Bay Park Tennis Courts" },
        { coords: [40.8248605177867, -73.93575721621467], name: "Frederick Johnson Tennis Courts" },
        { coords: [40.95201284672247, -73.89739381918628], name: "Trevor Park Tennis Courts" },
        { coords: [40.87386300854456, -73.84016042049983], name: "Haffen Park Tennis Courts" },
        { coords: [40.86858264472611, -73.7931027652295], name: "Orchard Beach Tennis Courts" },
        { coords: [40.785091, -73.968285], name: "Central Park Tennis Courts" },
        { coords: [40.84799799124556, -73.94628670072545], name: "Fort Washington Park Tennis Courts" },
      ],
    };
  },
  async mounted() {
    // Initialize the map
    this.initMap();

    // Fetch players from Firestore
    await this.fetchPlayers();

    // Add court markers with fetched player data
    this.addCourtMarkers();
  },
  methods: {
    // Initialize the Leaflet map
    initMap() {
      this.map = L.map("map").setView([40.84028258650481, -73.89492174552299], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(this.map);
    },
    // Fetch players from Firestore
    async fetchPlayers() {
      try {
        const querySnapshot = await getDocs(collection(db, "players"));
        const players = [];
        querySnapshot.forEach((doc) => {
          players.push({ id: doc.id, ...doc.data() });
        });

        // Update the players and topPlayers arrays
        this.players = players;
        this.topPlayers = this.calculateTopPlayers(players);
      } catch (error) {
        console.error("Error fetching players: ", error);
      }
    },
    // Calculate top players for the leaderboard
    calculateTopPlayers(players) {
      return players
        .sort((a, b) => b.elo - a.elo) // Sort by ELO in descending order
        .slice(0, 10); // Take the top 10 players
    },
    // Add court markers to the map
    addCourtMarkers() {
      this.courts.forEach((court) => {
        this.addMarker(court.coords, court.name, this.topPlayers);
      });
    },
    // Add individual marker to the map
    addMarker(coords, courtName, leaderboardData) {
      const marker = L.marker(coords).addTo(this.map);
      marker.bindPopup(courtName).on("click", () => {
        const popupContent = this.generateLeaderboardHTML(courtName, leaderboardData);
        const popup = L.popup()
          .setLatLng(coords)
          .setContent(popupContent)
          .openOn(this.map);
      });
    },
    // Generate HTML for the leaderboard popup
    generateLeaderboardHTML(courtName, leaderboardData) {
      return `
        <div class="leaderboard-popup">
          <h3>${courtName}</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>ELO</th>
              </tr>
            </thead>
            <tbody>
              ${leaderboardData
          .map(
            (player, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${player.name}</td>
                  <td>${player.elo}</td>
                </tr>`
          )
          .join("")}
            </tbody>
          </table>
        </div>`;
    },
    // Close the leaderboard popup
    closeLeaderboardPopup() {
      this.showLeaderboardPopup = false;
    },
  },
  components: {
    LeaderboardPopup,
  },
};
</script>

<style>
#map {
  height: 100vh;
}

.leaderboard-popup table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-popup th,
.leaderboard-popup td {
  border: 1px solid #ddd;
  padding: 8px;
}

.leaderboard-popup th {
  background-color: #f4f4f4;
  text-align: left;
}
</style>
