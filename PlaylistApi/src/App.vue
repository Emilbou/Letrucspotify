<template>
  <div id="app">
    <button v-if="!isAuthenticated" @click="authenticate">
      Se connecter à Spotify
    </button>
    <div v-else>
      <button @click="logout">Se déconnecter</button>
      <PlaylistList />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PlaylistList from "./components/PlaylistList.vue";
import {
  getAuthUrl,
  handleCallback,
  getAccessToken,
  logout as authLogout,
} from "./services/spotifyAuth";

const isAuthenticated = ref(false);

const authenticate = () => {
  window.location.href = getAuthUrl();
};

const logout = () => {
  authLogout();
  isAuthenticated.value = false;
};

const checkAuth = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      await handleCallback(code);
      window.history.replaceState({}, document.title, "/");
      isAuthenticated.value = true;
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
    }
  } else {
    const token = await getAccessToken();
    if (token) {
      isAuthenticated.value = true;
    }
  }
};

onMounted(checkAuth);
</script>
