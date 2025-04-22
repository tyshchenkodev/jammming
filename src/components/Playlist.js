import React, { useState } from "react";
import TrackList from './TrackList'

export default function Playlist(props) {

    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleChange(event) {
        props.onNameChange(event.target.value);
    }
    return (
        <div>
            {isEditing 
  ? <input 
      value={props.playlistName} 
      onChange={handleChange} 
      onBlur={() => setIsEditing(false)} 
    />
  : <h2 onClick={handleEditClick}>{props.playlistName}</h2>
}
        <TrackList 
                tracks={props.playlistTracks} 
                onRemove={props.onRemove}
                isRemoval={true}
/>
            <button onClick={props.onSave}>Save to Spotify</button>
        </div>
    )
};