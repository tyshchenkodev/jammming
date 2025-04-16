import React from "react";
import TrackList from './TrackList'

export default function Playlist(props) {
    function handleChange(event) {
        props.onNameChange(event.target.value);
    }
    return (
        <div>
            <input value={props.playlistName} onChange={handleChange}></input>
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove}/>
            <button>Save to Spotify</button>
        </div>
    )
};