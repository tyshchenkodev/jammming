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

    function handleRemove() {
        const track = {
            id: props.id,
            name: props.name,
            artist: props.artist,
            album: props.album
          };
          props.onRemove(track);
    }


    return (
        <div>
            <h3>{props.name}</h3>
            <span>{props.artist}</span>
            <p>{props.album}</p>
            {props.isRemoval
                    ? <button onClick={handleRemove}>-</button>
                    : <button onClick={handleAdd}>+</button>}
        </div>
    )
}