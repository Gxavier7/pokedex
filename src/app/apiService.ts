import { PokemonClient } from 'pokenode-ts';

const api = new PokemonClient();

export interface Pokemon {
  name: string,
  url: string
}

const apiService = {
  getPokemon: async (pokemon: string) => {
    return await api.getPokemonByName(pokemon) 
  },

  getAllPokemons: async () => {
    const callback = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    const response = await callback.json() 
    const data = response.results.map((pokemon: Pokemon) => {
      return pokemon.name
    })

    return data
  },
}

export default apiService