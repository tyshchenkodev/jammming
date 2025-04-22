import React from 'react';
import Track from './Track'

export default function TrackList(props) {
   
    return (
      <div>
        {(props.tracks.map(track => <Track 
                              key={track.id} 
                              name={track.name} 
                              artist={track.artist} 
                              album={track.album}
                              uri={track.uri} 
                              onAdd={props.onAdd}
                              onRemove={props.onRemove}
                              isRemoval={props.isRemoval}
/>))}
      </div>
    )

}