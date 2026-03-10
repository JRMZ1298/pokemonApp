import { pokeApi } from "../../api/pokeApi";
import type { Pokemon } from "../../interfaces/pokemon.interface";
import type { PokemonResponse } from "../../interfaces/pokemon.response";

interface Options {
  limit?: number;
  offset?: number;
}

/**
 * Función para obtener los pokemon desde la API
 * @param options parametros de limit y offset para la consulta de información
 * @returns Pokemon[] lista de los pokemon con su información
 */
export const getPokemonsAction = async (
  options: Options,
): Promise<Pokemon[]> => {
  const { limit, offset } = options;
  // Consulta de los pokemon con los parametros limit y offset
  const { data } = await pokeApi.get<PokemonResponse>("/pokemon", {
    params: { limit, offset },
  });

  // Consulta de la información de los pokemon obtenidos en la primera consulta
  const pokemons = await Promise.all(
    data.results.map(async (result) => {
      const { data } = await pokeApi.get<Pokemon>(`/pokemon/${result.name}`);
      return data;
    }),
  );

  return pokemons;
};
