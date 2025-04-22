import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) onSearch(query);
    setQuery('');
  };

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
