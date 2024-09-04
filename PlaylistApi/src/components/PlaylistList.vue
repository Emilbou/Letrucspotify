<template>
  <div>
    <h2>Mes Playlists</h2>
    <ul v-if="playlists.length">
      <li v-for="playlist in playlists" :key="playlist.id">
        <button @click="selectPlaylist(playlist.id)">
          {{ playlist.name }}
        </button>
      </li>
    </ul>
    <p v-else>Aucune playlist trouvée.</p>
    <SpotifyPlaylist
      v-if="selectedPlaylistId"
      :playlistId="selectedPlaylistId"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserPlaylists } from "../services/spotifyApi";
import SpotifyPlaylist from "./SpotifyPlaylist.vue";

const playlists = ref([]);
const selectedPlaylistId = ref(null);

const fetchPlaylists = async () => {
  try {
    playlists.value = await getUserPlaylists();
    console.log("Playlists récupérées:", playlists.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des playlists:", error);
  }
};

const selectPlaylist = (playlistId) => {
  console.log("Playlist sélectionnée:", playlistId);
  selectedPlaylistId.value = playlistId;
};

onMounted(fetchPlaylists);
</script>

<style scoped>
div {
  display: flex;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  width: 100%;
  min-height: 40px;
  padding: 10px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1ed760;
}
</style>
