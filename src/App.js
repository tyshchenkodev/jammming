import React, { useState } from "react";


function App() {
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

  return (
    <div>
      <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onNameChange={handleNameChange}/>
    </div>
  )
}