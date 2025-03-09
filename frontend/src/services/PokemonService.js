const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:80';

class PokemonService {
  // Obtener Pokémon por ID
  static async getPokemonById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('ERROR 404 Pokémon not found');
        }
        throw new Error('Error fetching Pokémon');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Error fetching Pokémon');
    }
  }

  // Obtener Pokémon por nombre
  static async getPokemonByName(name) {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('ERROR 404 Pokémon not found');
        }
        throw new Error('Error fetching Pokémon');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Error fetching Pokémon');
    }
  }
}

export default PokemonService;