import React from "react";


export default function Track(props) {

    function handleAdd() {
        const track = {
            name: props.name,
            artist: props.artist,
            album: props.album,
            id: props.id
          };
        props.onAdd(track);

    };

    return (
        <div className="track">
            <div className="track-info">
                <h3><strong>{props.name}</strong></h3>
                <span>{props.artist}</span>
                <p>{props.album}</p>
            </div>
            <div className="track-action">
                <button onClick={handleAdd}>+</button>
            </div>
        </div>
    );
};
