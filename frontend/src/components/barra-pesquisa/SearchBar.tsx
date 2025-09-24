import React, { useState, ChangeEvent } from 'react';
import '../barra-pesquisa/searchbar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Pesquisar agente"
        value={query}
        onChange={handleChange}
        className="searchbar-input"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;