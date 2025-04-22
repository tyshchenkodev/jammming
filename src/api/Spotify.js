const clientId     = '0ee0f6f828214cb8b6be5ed87ef40b36';
const clientSecret = 'c79799e8b78349d49f5e395949e0cd83';

let appToken;
let appTokenTimeout;

async function getAppToken() {
  if (appToken) return appToken;
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });
  const { access_token, expires_in } = await response.json();
  appToken = access_token;
  clearTimeout(appTokenTimeout);
  appTokenTimeout = setTimeout(() => (appToken = null), expires_in * 1000);
  return appToken;
}

async function search(term) {
  const token = await getAppToken();
  if (!token || !term.trim()) return [];
  const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await response.json();
  return (data.tracks?.items || []).map(item => ({
    id:     item.id,
    name:   item.name,
    artist: item.artists[0]?.name || 'Unknown',
    album:  item.album.name,
    uri:    item.uri
  }));
}

export const Spotify = { search };
