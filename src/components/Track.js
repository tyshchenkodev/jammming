import React from 'react';

export default function Track(props) {
    function handleAdd() {
        const track = {
            id: props.id,
            name: props.name,
            artist: props.artist,
            album: props.album
          };
          props.onAdd(track);
    }
    return (
        <div>
            <h3>{props.name}</h3>
            <span>{props.artist}</span>
            <p>{props.album}</p>
            <button onClick={handleAdd}>+</button>

        </div>
    )
}