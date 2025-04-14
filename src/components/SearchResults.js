import React from 'react';

export default function SearchResults(props) {
    return (
        <div>
            <h2>Search Results</h2>
            <TrackList tracks={props.tracks}/>
        </div>
    )
}