import React, { useState } from 'react';
import TrackList from './TrackList';

export default function Playlist({ playlistName, playlistTracks, onNameChange, onRemove, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <input
          value={playlistName}
          onChange={e => onNameChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{playlistName}</h2>
      )}

      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval />

      <button onClick={onSave} disabled={playlistTracks.length === 0}>Save to Spotify</button>
    </div>
  );
}
