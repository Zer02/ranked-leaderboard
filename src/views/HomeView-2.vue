<!-- src/views/HomeView-2.vue -->
<template>
  <div>
    <div id="map"></div>
    <LeaderboardPopup v-if="showLeaderboardPopup" :topPlayers="topPlayers" :courtName="selectedCourtName"
      @close="closeLeaderboardPopup" />
  </div>
</template>

<script>
import L from "leaflet";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import LeaderboardPopup from "../components/LeaderboardPopup.vue";

export default {
  data() {
    return {
      map: null,
      showLeaderboardPopup: false,
      players: [],
      topPlayers: [],
      selectedCourtName: "",
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
    this.initMap();
    await this.fetchPlayers();
    this.addCourtMarkers();
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([40.84028258650481, -73.89492174552299], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(this.map);
    },
    async fetchPlayers() {
      try {
        const querySnapshot = await getDocs(collection(db, "players"));
        const players = [];
        querySnapshot.forEach((doc) => {
          players.push({ id: doc.id, ...doc.data() });
        });
        this.players = players;
      } catch (error) {
        console.error("Error fetching players: ", error);
      }
    },
    calculateTopPlayers(players) {
      return players
        .sort((a, b) => b.elo - a.elo)
        .slice(0, 10);
    },
    addCourtMarkers() {
      this.courts.forEach((court) => {
        const marker = L.marker(court.coords).addTo(this.map);
        marker.bindPopup(court.name).on("click", async () => {
          await this.fetchPlayersForCourt(court.name);
          this.selectedCourtName = court.name;
          this.showLeaderboardPopup = true;
        });
      });
    },
    async fetchPlayersForCourt(courtName) {
      try {
        const courtQuery = query(
          collection(db, "players"),
          where("court", "==", courtName) // Assuming "court" is a field in your Firestore
        );
        const querySnapshot = await getDocs(courtQuery);
        const players = [];
        querySnapshot.forEach((doc) => {
          players.push({ id: doc.id, ...doc.data() });
        });
        this.topPlayers = this.calculateTopPlayers(players);
      } catch (error) {
        console.error("Error fetching players for court: ", error);
      }
    },
    closeLeaderboardPopup() {
      this.showLeaderboardPopup = false;
      this.selectedCourtName = "";
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
</style>
