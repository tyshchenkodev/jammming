import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults';
import React, { useState } from 'react';
import Playlist from './components/Playlist';


export default function App() {
  
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

    const searchResults = [{
      id: 1,
      name: "A Beautiful Lie",
      artist: "30 seconds to mars",
      album: "A Beautiful Lie"
    }];

    function handleNameChange(newName) {
      setPlaylistName(newName);
    }

    function addTrack(track) {
      const trackExists = playlistTracks.some(
        (savedTrack) => savedTrack.id === track.id);
        if (trackExists) return;
        setPlaylistTracks([...playlistTracks, track]);
    }

  return (
    <>
    <SearchResults tracks={searchResults} onAdd={addTrack}/>
    <Playlist onNameChange={handleNameChange} playlistName={playlistName} playlistTracks={playlistTracks}/>
    </>
  )
};