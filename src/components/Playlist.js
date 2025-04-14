import React from "react";
import TrackList from './components/TrackList.js';

export default function Playlist(props) {
    function handleChange(event) {
        props.onNameChange(event.target.value);
    }
    return (
        <div>
            <input value={props.playlistName} onChange={handleChange}></input>
            <TrackList tracks={props.playlistTracks}/>
            <button>Save to Spotify</button>
        </div>
    )
};