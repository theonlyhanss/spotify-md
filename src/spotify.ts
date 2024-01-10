import SpotifyWebApi from "spotify-web-api-node";

export const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  redirectUri: `${process.env.BASE_URL}/api/login-callback`,
});
