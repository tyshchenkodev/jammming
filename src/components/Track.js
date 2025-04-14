import React from 'react';

export default function Track(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <span>{props.artist}</span>
            <p>{props.album}</p>
            <button>+</button>
        </div>
    )
}