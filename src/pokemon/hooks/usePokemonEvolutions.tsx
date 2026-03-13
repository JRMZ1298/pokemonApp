import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPokemonEvolutionsByName } from "../actions/get-pokemon-evolutions-by-name";

/**
 * usePokemon es un custom hook utilizado para solicitar la peticion de informacion de un pokemon y almacenarla en cache
 * @returns useQuery con la data del pokemon
 */
export const usePokemonEvolutions = () => {
  const { pokemonName } = useParams();

  return useQuery({
    queryKey: ["evolutions", { pokemonName }],
    queryFn: () => getPokemonEvolutionsByName(pokemonName || ""),
    staleTime: 1000 * 60 * 5,
  });
};
