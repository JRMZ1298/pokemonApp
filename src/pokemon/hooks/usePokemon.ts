import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPokemonByName } from "../actions/get-pokemon-by-name";

/**
 * usePokemon es un custom hook utilizado para solicitar la peticion de informacion de un pokemon y almacenarla en cache
 * @returns useQuery con la data del pokemon
 */
export const usePokemon = () => {
  const { pokemonName } = useParams();

  return useQuery({
    queryKey: ["pokemon", { pokemonName }],
    queryFn: () => getPokemonByName(pokemonName || ""),
    staleTime: 1000 * 60 * 5,
  });
};
