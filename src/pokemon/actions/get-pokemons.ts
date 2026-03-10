import { pokeApi } from "../../api/pokeApi";
import type { Pokemon } from "../../interfaces/pokemon.interface";
import type { PokemonResponse } from "../../interfaces/pokemon.response";

interface Options {
  limit?: number;
  offset?: number;
}

export const getPokemonsAction = async (
  options: Options,
): Promise<Pokemon[]> => {
  const { limit, offset } = options;

  const { data } = await pokeApi.get<PokemonResponse>("/pokemon", {
    params: { limit, offset },
  });

  const pokemons = await Promise.all(
    data.results.map(async (result) => {
      const { data } = await pokeApi.get<Pokemon>(`/pokemon/${result.name}`);
      return data;
    }),
  );

  return pokemons;
};
