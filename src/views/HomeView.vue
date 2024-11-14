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
      topPlayers: [
        { id: 1, name: 'Player 1', elo: 1500, matchesPlayed: 10, wins: 5, winPercentage: '50%' },
        { id: 2, name: 'Player 2', elo: 1400, matchesPlayed: 8, wins: 4, winPercentage: '50%' },
      ],
      courts: [
        { coords: [40.87801390008082, -73.87783907227765], name: 'Oval Park Tennis Courts' },
        { coords: [40.89086962874917, -73.8928386675601], name: 'Van Cortlandt Park Tennis Courts' },
        { coords: [40.92609570209264, -73.87923773969872], name: 'Tibbetts Brook Park Tennis Courts' },
        { coords: [40.89595441574829, -73.87932418934814], name: 'Indian Field Tennis Courts' },
        { coords: [40.84028258650481, -73.89492174552299], name: 'Crotona Park Tennis Center' },
        { coords: [40.84980841358763, -73.82318750318782], name: 'Pelham Bay Park Tennis Courts' },
        { coords: [40.8248605177867, -73.93575721621467], name: 'Frederick Johnson Tennis Courts' },
        { coords: [40.95201284672247, -73.89739381918628], name: 'Trevor Park Tennis Courts' },
        { coords: [40.87386300854456, -73.84016042049983], name: 'Haffen Park Tennis Courts' },
        { coords: [40.86858264472611, -73.7931027652295], name: 'Orchard Beach Tennis Courts' },
        { coords: [40.785091, -73.968285], name: 'Central Park Tennis Courts' },
        { coords: [40.84799799124556, -73.94628670072545], name: 'Fort Washington Park Tennis Courts' },
      ]
    };
  },
  mounted() {
    this.initMap();
    this.addCourtMarkers();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([40.84028258650481, -73.89492174552299], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },
    addCourtMarkers() {
      this.courts.forEach(court => {
        this.addMarker(court.coords, court.name, this.topPlayers);
      });
    },
    addMarker(coords, courtName, leaderboardData) {
      const marker = L.marker(coords).addTo(this.map);
      marker.bindPopup(courtName).on('click', (e) => {
        const { lat, lng } = e.latlng;
        const popupContent = this.generateLeaderboardHTML(courtName, leaderboardData);
        const popup = L.popup()
          .setLatLng({ lat, lng })
          .setContent(popupContent)
          .openOn(this.map);
      });
    },
    generateLeaderboardHTML(courtName, leaderboardData) {
      return `
        <div class="leaderboard-popup">
          <h3>${courtName}</h3>
          <table>
            ${leaderboardData.map((player, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.elo}</td>
              </tr>`).join('')}
          </table>
        </div>`;
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
