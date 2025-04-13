import React from "react";
import TrackList from "./TrackList";

export default function Playlist(props) {

    function handleChange(event) {
       const newName = event.target.value;
       props.onNameChange(newName);
    }

    return(
        <div className="playlist">
        <input value={props.playlistName} onChange={handleChange}></input>
        <TrackList tracks={props.playlistTracks} />
        <button>Save to Spotify</button>
        </div>
    );
};