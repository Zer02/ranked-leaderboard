<template>
  <div>
    <div id="map"></div>
    <LeaderboardPopup v-if="showLeaderboardPopup" :topPlayers="topPlayers" @close="closeLeaderboardPopup" />
  </div>
</template>

<script>
import L from 'leaflet';
import LeaderboardPopup from '../components/LeaderboardPopup.vue';

export default {
  data() {
    return {
      map: null,
      showLeaderboardPopup: false,
      topPlayers: [
        // Dummy data for demonstration
        { id: 1, name: 'Player 1', elo: 1500, matchesPlayed: 10, wins: 5, winPercentage: '50%' },
        { id: 2, name: 'Player 2', elo: 1400, matchesPlayed: 8, wins: 4, winPercentage: '50%' },
        // Add more players as needed
      ]
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([40.7128, -74.006], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Add marker for a tennis court (Central Park, NYC)
      this.addMarker([40.785091, -73.968285], 'Central Park Tennis Courts', 'Central Park Tennis Courts', this.topPlayers);
    },
    addMarker(coords, title, courtName, leaderboardData) {
      const marker = L.marker(coords).addTo(this.map);
      marker.bindPopup(title).on('click', (e) => {
        const { lat, lng } = e.latlng;
        const popupContent = this.generateLeaderboardHTML(courtName, leaderboardData);
        const popup = L.popup()
          .setLatLng({ lat, lng })
          .setContent(popupContent)
          .openOn(this.map);
      });
    },
    generateLeaderboardHTML(courtName, leaderboardData) {
      let html = `<div class="leaderboard-popup"><h3>${courtName}</h3><table>`;
      leaderboardData.forEach((player, index) => {
        html += `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.elo}</td></tr>`;
      });
      html += '</table></div>';
      return html;
    },
    closeLeaderboardPopup() {
      this.showLeaderboardPopup = false;
    }
  },
  components: {
    LeaderboardPopup
  }
};
</script>

<style>
#map {
  height: 100vh;
}
</style>
