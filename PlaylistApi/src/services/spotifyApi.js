import axios from 'axios';
import { getAccessToken } from './spotifyAuth';

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

spotifyApi.interceptors.request.use(async config => {
  const token = await getAccessToken();
  if (token) {
    console.log('Token utilisé pour la requête:', token);
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.error('Aucun token disponible pour la requête');
  }
  return config;
}, error => {
  return Promise.reject(error);
});
export const getUserProfile = async () => {
  try {
    const response = await spotifyApi.get('/me');
    console.log('Profil utilisateur:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error.response?.data);
    throw error;
  }
};

export const getUserPlaylists = async () => {
  try {
    console.log('Tentative de récupération des playlists...');
    const response = await spotifyApi.get('/me/playlists');
    console.log('Réponse complète de l\'API:', response);
    console.log('Playlists de l\'utilisateur récupérées:', response.data.items);
    return response.data.items;
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des playlists:', error.response?.data);
    throw error;
  }
};

export const getPlaylistTracks = async (playlistId) => {
  try {
    const response = await spotifyApi.get(`/playlists/${playlistId}/tracks`);
    console.log('Pistes de la playlist récupérées:', response.data.items);
    return response.data.items.map(item => item.track);
  } catch (error) {
    console.error('Erreur lors de la récupération des pistes de la playlist:', error);
    throw error;
  }
};

export const getPlaylistDetails = async (playlistId) => {
  try {
    const response = await spotifyApi.get(`/playlists/${playlistId}`);
    console.log('Détails de la playlist récupérés:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la playlist:', error);
    throw error;
  }
};

export const searchTracks = async (query) => {
  try {
    const response = await spotifyApi.get('/search', {
      params: { q: query, type: 'track' }
    });
    console.log('Résultats de la recherche:', response.data.tracks.items);
    return response.data.tracks.items;
  } catch (error) {
    console.error('Erreur lors de la recherche de pistes:', error);
    throw error;
  }
};

export const getAudioFeatures = async (trackId) => {
  try {
    const response = await spotifyApi.get(`/audio-features/${trackId}`);
    console.log('Caractéristiques audio récupérées:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des caractéristiques audio:', error);
    throw error;
  }
};