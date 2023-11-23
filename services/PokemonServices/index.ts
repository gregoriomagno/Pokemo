import { apiPokemon } from "../api/pokemonApi";

export async function getPokemonById(id: number) {
  const response = await apiPokemon.get(`pokemon/${id}`);
  return response.data;
}
