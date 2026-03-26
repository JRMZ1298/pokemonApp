// hooks/useFavorites.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFavoriteAction,
  getFavoritesAction,
  removeFavoriteAction,
} from "../actions/toggle-favorite-pokemon";

export const useFavorites = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavoritesAction(userId!),
    enabled: !!userId, // solo si hay usuario
  });

  const { mutate: addFavorite } = useMutation({
    mutationFn: (pokemonId: number) => addFavoriteAction(userId!, pokemonId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] }),
  });

  const { mutate: removeFavorite } = useMutation({
    mutationFn: (pokemonId: number) => removeFavoriteAction(userId!, pokemonId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] }),
  });

  const isFavorite = (pokemonId: number) => favorites.includes(pokemonId);

  const toggleFavorite = (pokemonId: number) => {
    if (isFavorite(pokemonId)) removeFavorite(pokemonId);
    else addFavorite(pokemonId);
  };

  return { favorites, isFavorite, toggleFavorite };
};
