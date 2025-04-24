// src/api/Spotify.js

/* ---------- конфіг ---------- */
const clientId    = '0ee0f6f828214cb8b6be5ed87ef40b36';
const redirectUri = 'http://127.0.0.1:3000/';
const scope       = 'playlist-modify-public playlist-modify-private';
/* ---------------------------- */

const STORAGE = {
  VERIFIER:       'spotify_code_verifier',
  TOKEN:          'spotify_access_token',
  REFRESH_TOKEN:  'spotify_refresh_token',
  EXPIRES_AT:     'spotify_token_expires_at'
};

/**
 * Генерація випадкового рядка потрібної довжини
 */
function generateRandomString(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars.charAt(array[i] % chars.length);
  }
  return result;
}

/**
 * Обчислення SHA-256 і перетворення в Base64URL
 */
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data    = encoder.encode(verifier);
  const digest  = await window.crypto.subtle.digest('SHA-256', data);
  const b64     = btoa(String.fromCharCode(...new Uint8Array(digest)))
                    .replace(/=/g, '')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_');
  return b64;
}

/**
 * Почати авторизацію (редірект на Spotify)
 */
async function initiateAuth() {
  const verifier = generateRandomString();
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem(STORAGE.VERIFIER, verifier);

  const params = new URLSearchParams({
    response_type:     'code',
    client_id:         clientId,
    scope,
    redirect_uri:      redirectUri,
    code_challenge:    challenge,
    code_challenge_method: 'S256'
  });

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * Обмін коду на токен
 */
async function exchangeCodeForToken(code) {
  const verifier = localStorage.getItem(STORAGE.VERIFIER);
  const body = new URLSearchParams({
    grant_type:    'authorization_code',
    code,
    redirect_uri:  redirectUri,
    client_id:     clientId,
    code_verifier: verifier
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    body.toString()
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  const { access_token, expires_in, refresh_token } = await res.json();
  const expiresAt = Date.now() + expires_in * 1000;

  localStorage.setItem(STORAGE.TOKEN,         access_token);
  localStorage.setItem(STORAGE.REFRESH_TOKEN, refresh_token);
  localStorage.setItem(STORAGE.EXPIRES_AT,    expiresAt.toString());

  return access_token;
}

/**
 * Оновлення access token за допомогою refresh token
 */
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(STORAGE.REFRESH_TOKEN);
  if (!refreshToken) throw new Error('No refresh token stored');

  const body = new URLSearchParams({
    grant_type:    'refresh_token',
    refresh_token: refreshToken,
    client_id:     clientId
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    body.toString()
  });
  if (!res.ok) throw new Error(`Refresh failed: ${res.status}`);
  const { access_token, expires_in } = await res.json();
  const expiresAt = Date.now() + expires_in * 1000;

  localStorage.setItem(STORAGE.TOKEN,      access_token);
  localStorage.setItem(STORAGE.EXPIRES_AT, expiresAt.toString());

  return access_token;
}

/**
 * Повертає валідний access token або ініціює авторизацію
 */
async function getAccessToken() {
  // 1) Обробити повернення з Spotify: ?code=...
  const params = new URLSearchParams(window.location.search);
  const code   = params.get('code');
  if (code) {
    // очистити URL, щоб не дублювати обмін
    window.history.replaceState({}, document.title, redirectUri);
    return await exchangeCodeForToken(code);
  }

  // 2) Перевірити закешований токен
  const token    = localStorage.getItem(STORAGE.TOKEN);
  const expires  = parseInt(localStorage.getItem(STORAGE.EXPIRES_AT), 10);
  if (token && Date.now() < expires) {
    return token;
  }

  // 3) Якщо є refresh_token — освіжити
  if (localStorage.getItem(STORAGE.REFRESH_TOKEN)) {
    return await refreshAccessToken();
  }

  // 4) Інакше почати нову авторизацію
  await initiateAuth();
  // функція перерве виконання через редірект
}

/**
 * Шукає треки через Spotify Web API
 */
export async function search(term) {
  const token = await getAccessToken();
  if (!term.trim()) return [];
  const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term.trim())}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Spotify search failed: ${res.status}`);
  const data = await res.json();
  return (data.tracks?.items || []).map(item => ({
    id:     item.id,
    name:   item.name,
    artist: item.artists[0]?.name ?? 'Unknown',
    album:  item.album.name,
    uri:    item.uri
  }));
}

/**
 * Зберігає готовий плейлист у Spotify
 */
export async function savePlaylist(name, trackUris) {
  const token = await getAccessToken();
  if (!token) throw new Error('No access token available');

  // 1) Отримати ID користувача
  const meRes = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!meRes.ok) throw new Error(`Failed to fetch user: ${meRes.status}`);
  const userId = (await meRes.json()).id;

  // 2) Створити плейлист
  const createRes = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, public: false })
    }
  );
  if (!createRes.ok) throw new Error(`Create playlist failed: ${createRes.status}`);
  const playlistId = (await createRes.json()).id;

  // 3) Додати треки
  const addRes = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: trackUris })
    }
  );
  if (!addRes.ok) throw new Error(`Add tracks failed: ${addRes.status}`);

  return true;
}

export const Spotify = {
    search,
    savePlaylist
  };
  
