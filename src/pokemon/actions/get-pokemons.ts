import { pokeApi } from "../../api/pokeApi";
import type { Pokemon } from "../../interfaces/pokemon.interface";
import type { PokemonResponse } from "../../interfaces/pokemon.response";
import { getPokemonByName } from "./get-pokemon-by-name";

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
    data.results.map(async (pokemon) => {
      return getPokemonByName(pokemon.name);
    }),
  );

  return pokemons;
};
