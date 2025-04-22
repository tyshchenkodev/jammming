import React, { useState } from 'react';
import { Spotify } from './api/Spotify';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

export default function App() {
  const [playlistName, setPlaylistName]   = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults]   = useState([]);

  const addTrack = track => {
    if (playlistTracks.some(t => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = track =>
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));

  const savePlaylist = () => {
    const uris = playlistTracks.map(t => t.uri);
    console.log('URIs to save:', uris);
  };

  const searchSpotify = async term => {
    try {
      const tracks = await Spotify.search(term);
      setSearchResults(tracks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <SearchBar onSearch={searchSpotify} />

      <SearchResults tracks={searchResults} onAdd={addTrack} />

      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={setPlaylistName}
        onRemove={removeTrack}
        onSave={savePlaylist}
      />
    </div>
  );
}
