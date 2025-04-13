import React from "react";
import Track from "./Track";

export default function TrackList(props) {
    return (
        <div className="track-list">
          {props.tracks.map(track => {
            return (
              <Track
                key={track.id}
                name={track.name}
                artist={track.artist}
                album={track.album}
                onAdd={props.onAdd}
              />
            );
          })}
        </div>
      );      
};