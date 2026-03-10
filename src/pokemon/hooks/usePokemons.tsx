import { useSearchParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonsAction } from "../actions/get-pokemons";

export const usePokemons = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit"));
  const offset = Number(searchParams.get("offset"));

  return useInfiniteQuery({
    queryKey: ["pokemons", { limit, offset }],
    queryFn: ({ pageParam }) =>
      getPokemonsAction({ limit: limit, offset: pageParam }),
    initialPageParam: offset,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = offset + allPages.length * limit;
      return lastPage.length < limit ? undefined : nextOffset;
    },
    staleTime: 1000 * 60 * 5,
  });
};
