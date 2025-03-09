// src/components/PokemonSearch.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonSearch from './PokemonSearch';
import PokemonService from '../services/PokemonService';

// Mock del servicio
jest.mock('../services/PokemonService');

describe('PokemonSearch Component', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    abilities: ['static', 'lightning-rod'],
    sprite_url: 'https://example.com/pikachu.png'
  };

  beforeEach(() => {
    // Limpiar mocks entre pruebas
    jest.clearAllMocks();
  });

  test('renders search form correctly', () => {
    render(<PokemonSearch />);
    
    // Verificar que los elementos principales están presentes
    expect(screen.getByText('Pokémon Finder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Pokémon ID')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Search by ID')).toBeChecked();
  });

  test('searches for Pokémon by ID when form is submitted', async () => {
    // Configurar mock para devolver un Pokémon
    PokemonService.getPokemonById.mockResolvedValue(mockPokemon);
    
    render(<PokemonSearch />);
    
    // Simular búsqueda
    const input = screen.getByPlaceholderText('Enter Pokémon ID');
    fireEvent.change(input, { target: { value: '25' } });
    
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    // Verificar que el servicio fue llamado correctamente
    expect(PokemonService.getPokemonById).toHaveBeenCalledWith('25');
    
    // Verificar que los datos del Pokémon se muestran
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('#25')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
    });
  });

  test('searches for Pokémon by name when that option is selected', async () => {
    // Configurar mock para devolver un Pokémon
    PokemonService.getPokemonByName.mockResolvedValue(mockPokemon);
    
    render(<PokemonSearch />);
    
    // Cambiar a búsqueda por nombre
    const nameRadio = screen.getByLabelText('Search by Name');
    fireEvent.click(nameRadio);
    
    // Simular búsqueda
    const input = screen.getByPlaceholderText('Enter Pokémon Name');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    // Verificar que el servicio fue llamado correctamente
    expect(PokemonService.getPokemonByName).toHaveBeenCalledWith('pikachu');
    
    // Verificar que los datos del Pokémon se muestran
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });

  test('shows error message when Pokémon is not found', async () => {
    // Configurar mock para lanzar un error
    PokemonService.getPokemonById.mockRejectedValue(new Error('ERROR 404 Pokémon not found'));
    
    render(<PokemonSearch />);
    
    // Simular búsqueda
    const input = screen.getByPlaceholderText('Enter Pokémon ID');
    fireEvent.change(input, { target: { value: '9999' } });
    
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    // Verificar que se muestra el mensaje de error
    await waitFor(() => {
      expect(screen.getByText('ERROR 404 Pokémon not found')).toBeInTheDocument();
    });
  });
});