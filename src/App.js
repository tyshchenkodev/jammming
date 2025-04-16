import React, { useState } from "react";
import Playlist from './components/Playlist';
import SearchResults from './components/SearchResults';


export default function App() {
  const searchResults = [{
    id: 1,
    name: 'A Beautiful Lie',
    artist: '30 Seconds to Mars',
    album: 'A Beautiful Lie'
  }];

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function handleNameChange(newName) {
    setPlaylistName(newName);
  }

  function addTrack(track) {
    const trackExists = playlistTracks.some(savedTrack => savedTrack.id === track.id);
    if(trackExists) return;
    setPlaylistTracks([...playlistTracks, track]);
  }

  function removeTrack(track) {
    const remove = playlistTracks.filter(savedTrack => track.id !== savedTrack.id);
    setPlaylistTracks(remove);
  }

  return (
    <div>
      <SearchResults 
          onAdd={addTrack} 
          tracks={searchResults}/>
      <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          onNameChange={handleNameChange}
          onRemove={removeTrack}/>
    </div>
  )
}