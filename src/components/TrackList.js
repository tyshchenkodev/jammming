import React from 'react';
import Track from './components/Track.js'

export default function TrackList(props) {
   
    return (
      <div>
        {(props.tracks.map(track => <Track key={track.id} name={track.name} artist={track.artist} album={track.album}/>))}
      </div>
    )

}