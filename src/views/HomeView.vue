<template>
  <div>
    <div id="map"></div>
    <LeaderboardPopup v-if="showLeaderboardPopup" :topPlayers="topPlayers" @close="closeLeaderboardPopup" :players="players" />
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
      players: [], // Player data to be loaded or generated
      selectedPlayer: null,
      topPlayers: [ // Dummy data for demonstration
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
      this.map = L.map('map').setView([40.84028258650481, -73.89492174552299], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Add marker for a tennis court (Central Park, NYC)
      this.addMarker([40.785091, -73.968285], 'Central Park Tennis Courts', 'Central Park Tennis Courts', this.topPlayers);

      this.addMarker([40.84028258650481, -73.89492174552299], 'Crotona Park Tennis Center', 'Crotona Park Tennis Center', this.topPlayers);

      this.addMarker([40.87801390008082, -73.87783907227765], 'Oval Park Tennis Courts', 'Oval Park Tennis Courts', this.topPlayers);

      this.addMarker([40.89086962874917, -73.8928386675601], 'Van Cortlandt Park Tennis Courts', 'Van Cortlandt Park Tennis Courts', this.topPlayers);

      this.addMarker([40.92609570209264, -73.87923773969872], 'Tibbetts Brook Park Tennis Courts', 'Tibbetts Brook Park Tennis Courts', this.topPlayers);

      this.addMarker([40.84980841358763, -73.82318750318782], 'Pelham Bay Park Tennis Courts', 'Pelham Bay Park Tennis Courts', this.topPlayers);

      this.addMarker([40.8248605177867, -73.93575721621467], 'Frederick Johnson Tennis Courts', 'Frederick Johnson Tennis Courts', this.topPlayers);
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
    },
    showPlayerPopup(player) {
      this.selectedPlayer = player;
      this.showLeaderboardPopup = true;
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
