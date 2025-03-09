import React, { useState } from 'react';
import PokemonService from '../services/PokemonService';

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('id'); // 'id' o 'name'

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a Pokémon ID or name');
      return;
    }

    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      let result;
      if (searchType === 'id') {
        result = await PokemonService.getPokemonById(searchTerm);
      } else {
        result = await PokemonService.getPokemonByName(searchTerm);
      }
      setPokemon(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = async () => {
    if (pokemon && pokemon.id > 1) {
      try {
        setLoading(true);
        const result = await PokemonService.getPokemonById(pokemon.id - 1);
        setPokemon(result);
        setSearchTerm(result.id.toString());
        setSearchType('id');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNext = async () => {
    if (pokemon) {
      try {
        setLoading(true);
        const result = await PokemonService.getPokemonById(pokemon.id + 1);
        setPokemon(result);
        setSearchTerm(result.id.toString());
        setSearchType('id');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pokemon-search">
      <h2>Pokémon Finder</h2>
      
      <form onSubmit={handleSearch}>
        <div className="search-controls">
          <div className="search-type">
            <label>
              <input
                type="radio"
                name="searchType"
                value="id"
                checked={searchType === 'id'}
                onChange={() => setSearchType('id')}
              />
              Search by ID
            </label>
            <label>
              <input
                type="radio"
                name="searchType"
                value="name"
                checked={searchType === 'name'}
                onChange={() => setSearchType('name')}
              />
              Search by Name
            </label>
          </div>
          
          <div className="search-input">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchType === 'id' ? "Enter Pokémon ID" : "Enter Pokémon Name"}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {pokemon && (
        <div className="pokemon-card">
          <div className="pokemon-header">
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <span className="pokemon-id">#{pokemon.id}</span>
          </div>
          
          <div className="pokemon-image">
            <img src={pokemon.sprite_url} alt={pokemon.name} />
          </div>
          
          <div className="pokemon-details">
            <div className="pokemon-types">
              <strong>Types:</strong>
              <div className="types-list">
                {pokemon.types.map(type => (
                  <span key={type} className={`type ${type}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pokemon-abilities">
              <strong>Abilities:</strong>
              <ul>
                {pokemon.abilities.map(ability => (
                  <li key={ability}>{ability.replace('-', ' ')}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={loading || pokemon.id <= 1}>
              Previous
            </button>
            <button onClick={handleNext} disabled={loading}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;