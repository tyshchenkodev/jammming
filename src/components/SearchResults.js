import React from "react";
import TrackList from "./TrackList";

export default function SearchResults(props) {
    return(
        <div>
            <h2>Search Results</h2>
            <TrackList tracks={props.tracks} onAdd={props.onAdd} />
        </div>
    )
}