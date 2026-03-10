import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPokemonsAction } from "../actions/get-pokemons";

export const usePokemons = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit"));
  const offset = Number(searchParams.get("offset"));

  return useQuery({
    queryKey: ["pokemons", { offset, limit }],
    queryFn: () =>
      getPokemonsAction({
        limit: limit,
        offset: offset,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
