import React from 'react';
import Track from './Track';

export default function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div>
      {tracks.map(track => (
        <Track
          key={track.id}
          {...track}          /* передає id, name, artist, album, uri */
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}
