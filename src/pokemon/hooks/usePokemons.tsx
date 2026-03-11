import { useSearchParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonsAction } from "../actions/get-pokemons";

/**
 * usePokemons es un custom hook utilizado para solicitar la peticion de informacion, almacenar en cache y manejo del scroll
 * @returns useInifiniteQuery con la data de los pokemon y metodos para el manejo del scroll (hasNextPage, fetchNextPage, isFetchingNextPage)
 */
export const usePokemons = () => {
  const [searchParams] = useSearchParams();

  // Tomar de los search params el limit y offset para realizar la peticion a la api
  const limit = Number(searchParams.get("limit")) || 12;
  const offset = Number(searchParams.get("offset")) || 0;

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
