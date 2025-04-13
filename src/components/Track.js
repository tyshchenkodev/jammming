import React from "react";

export default function Track(props) {
    return (
        <div className="track">
            <div className="track-info">
                <h3><strong>{props.name}</strong></h3>
                <span>{props.artist}</span>
                <p>{props.album}</p>
            </div>
            <div className="track-action">
                <button>+</button>
            </div>
        </div>
    );
};
