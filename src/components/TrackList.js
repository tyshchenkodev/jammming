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
                                        onAdd={props.onAdd}
                                        onRemove={props.onRemove}
                                        isRemoval={true}/>))}
      </div>
    )

}