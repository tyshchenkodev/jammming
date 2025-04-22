/* ---------- конфіг ---------- */
const clientId    = '0ee0f6f828214cb8b6be5ed87ef40b36';
const redirectUri = 'http://127.0.0.1:3000/callback';
const scope       = 'playlist-modify-public playlist-modify-private';
/* ---------------------------- */

let accessToken;
let tokenExpireTimeout;

function getAccessToken() {
  /* 1 – якщо токен уже є → повертаємо */
  if (accessToken) return accessToken;

  /* 2 – перевіряємо, чи Spotify повернув нас з #access_token */
  const hash = window.location.hash; // "#access_token=...&expires_in=..."
  if (hash.includes('access_token') && hash.includes('expires_in')) {
    const params    = new URLSearchParams(hash.substring(1)); // без "#"
    accessToken     = params.get('access_token');
    const expiresIn = Number(params.get('expires_in'));

    // таймер автолог‑аута
    clearTimeout(tokenExpireTimeout);
    tokenExpireTimeout = setTimeout(() => (accessToken = undefined), expiresIn * 1000);

    // прибираємо хеш із адреси
    window.history.pushState('', null, redirectUri);

    return accessToken;
  }

  /* 3 – токена немає → редіректимо на сторінку авторизації Spotify */
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const authUrl =
    `${authEndpoint}?client_id=${clientId}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&show_dialog=true`;

  window.location = authUrl;       // <‑ переадресація
  /* Після редіректу функція вже не виконується далі */
}

/* експорт “служби” */
export const Spotify = { getAccessToken };
