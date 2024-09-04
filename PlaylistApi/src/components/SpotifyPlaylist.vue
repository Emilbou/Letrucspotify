<template>
  <div>
    <h3>Pistes de la playlist</h3>
    <ul v-if="tracks.length">
      <li v-for="track in tracks" :key="track.id" @click="selectTrack(track)">
        {{ track.name }} - {{ track.artists[0].name }}
      </li>
    </ul>
    <p v-else>Chargement ...</p>

    <div v-if="selectedTrack" class="track-details">
      <h4>{{ selectedTrack.name }}</h4>
      <div
        style="
          position: relative;
          transform: rotate(0deg);
          animation: spin 5s linear infinite;
        "
      >
        <img
          src="../../public/black_vinyl-transformed.webp"
          style="width: 500px; position: relative"
          alt=""
        />
        <img
          :src="selectedTrack.album.images[0].url"
          alt="Album cover"
          style="
            width: 170px;
            height: 170px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
          "
        />
      </div>

      <p>Artiste: {{ selectedTrack.artists[0].name }}</p>
      <p>Album: {{ selectedTrack.album.name }}</p>
      <p>Durée: {{ formatDuration(selectedTrack.duration_ms) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getPlaylistTracks } from "../services/spotifyApi";

const props = defineProps(["playlistId"]);
const tracks = ref([]);
const selectedTrack = ref(null);

const fetchTracks = async () => {
  try {
    tracks.value = await getPlaylistTracks(props.playlistId);
  } catch (error) {
    console.error("Erreur lors de la récupération des pistes:", error);
  }
};

const selectTrack = (track) => {
  selectedTrack.value = track;
};

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, "0")}`;
};

onMounted(fetchTracks);

watch(() => props.playlistId, fetchTracks);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

li:hover {
  background-color: #f0f0f0;
}

.track-details {
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  height: 100svh;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
