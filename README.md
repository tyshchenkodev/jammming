# Jammming — Spotify Playlist Builder

Jammming is a React application that lets users search for tracks through the Spotify Web API, build a custom playlist, and save it directly to their Spotify account.

## Features

- Search tracks from Spotify
- Add tracks to a custom playlist
- Remove tracks from the playlist
- Rename the playlist
- Save the playlist to a Spotify account
- Spotify authorization with the PKCE flow

## Tech Stack

- React
- JavaScript
- Spotify Web API
- OAuth 2.0 PKCE
- Fetch API
- Create React App

## Project Structure

```txt
src/
  api/
    Spotify.js
  components/
    Playlist.js
    SearchBar.js
    SearchResults.js
    Track.js
    TrackList.js
  App.js
