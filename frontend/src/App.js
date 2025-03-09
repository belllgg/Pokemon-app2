import React from 'react';
import './App.css';
import PokemonSearch from './components/PokemonSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon Explorer</h1>
      </header>
      <main>
        <PokemonSearch />
      </main>
      <footer>
        <p>Pokémon Explorer</p>
      </footer>
    </div>
  );
}

export default App;