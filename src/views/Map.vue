<template>
  <div id="map" style="height: 500px; width: 100%;"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LeaderboardPopup from '@/components/LeaderboardPopup.vue';
import { createApp } from 'vue';
import { useLeaderboardStore } from '@/stores/leaderboardStore';

// Import Leaflet marker images explicitly
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default {
  data() {
    return {
      courts: [
        {
          id: 1,
          name: "Oval Park Tennis Courts",
          lat: 40.87801390008082,
          lng: -73.87783907227765,
        },
        {
          id: 2,
          name: "Van Cortlandt Park Tennis Courts",
          lat: 40.89086962874917,
          lng: -73.8928386675601,
        },
        {
          id: 3,
          name: "Tibbetts Brook Park Tennis Courts",
          lat: 40.92609570209264,
          lng: -73.87923773969872,
        },
        {
          id: 4,
          name: "Indian Field Tennis Courts",
          lat: 40.89595441574829,
          lng: -73.87932418934814,
        },
        {
          id: 5,
          name: "Crotona Park Tennis Center",
          lat: 40.84028258650481,
          lng: -73.89492174552299,
        },
        {
          id: 6,
          name: "Pelham Bay Park Tennis Courts",
          lat: 40.84980841358763,
          lng: -73.82318750318782,
        },
        {
          id: 7,
          name: "Frederick Johnson Tennis Courts",
          lat: 40.8248605177867,
          lng: -73.93575721621467,
        },
        {
          id: 8,
          name: "Trevor Park Tennis Courts",
          lat: 40.95201284672247,
          lng: -73.89739381918628,
        },
        {
          id: 9,
          name: "Haffen Park Tennis Courts",
          lat: 40.87386300854456,
          lng: -73.84016042049983,
        },
        {
          id: 10,
          name: "Orchard Beach Tennis Courts",
          lat: 40.86858264472611,
          lng: -73.7931027652295,
        },
        {
          id: 11,
          name: "Central Park Tennis Courts",
          lat: 40.785091,
          lng: -73.968285,
        },
        {
          id: 12,
          name: "Fort Washington Park Tennis Courts",
          lat: 40.84799799124556,
          lng: -73.94628670072545,
        },
      ],
    };
  },
  setup() {
    const leaderboardStore = useLeaderboardStore();
    leaderboardStore.loadPlayers(); // Load players from localStorage
    return { leaderboardStore };
  },
  methods: {
    handleViewFullLeaderboard(courtId) {
      console.log('View Full Leaderboard for Court ID:', courtId);
      this.$router.push({ name: 'leaderboard', params: { id: courtId } });
    },
  },
  mounted() {
    // Center the map on NYC
    const map = L.map('map').setView([40.84028258650481, -73.89492174552299], 12);

    // Add a tile layer (map background)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Define a custom Leaflet marker icon
    const customIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41], // Default Leaflet marker size
      iconAnchor: [12, 41], // Adjusts where the icon points
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add markers for each court with the custom icon
    this.courts.forEach(court => {
      const marker = L.marker([court.lat, court.lng], { icon: customIcon }).addTo(map);

      // Create a div to hold the Vue component
      const popupContent = document.createElement('div');

      // Get the top 5 players from the store
      const top5Players = this.leaderboardStore.rankedPlayers.slice(0, 5);

      // Mount the LeaderboardPopup component to the div
      createApp(LeaderboardPopup, {
        courtName: court.name,
        localRankings: top5Players,
        courtId: court.id,
        onViewFullLeaderboard: this.handleViewFullLeaderboard,
      }).mount(popupContent);

      // Bind the popup to the marker
      marker.bindPopup(popupContent);

      // Log when the marker is clicked
      marker.on('click', () => {
        console.log('Marker clicked:', court.name);
      });
    });
  },
};
</script>