import React from 'react';

export default function Track({ id, name, artist, album, uri, onAdd, onRemove, isRemoval }) {
  const trackObj = { id, name, artist, album, uri };

  return (
    <div>
      <h3>{name}</h3>
      <span>{artist}</span>
      <p>{album}</p>

      {isRemoval ? (
        <button onClick={() => onRemove(trackObj)}>-</button>
      ) : (
        <button onClick={() => onAdd(trackObj)}>+</button>
      )}
    </div>
  );
}
