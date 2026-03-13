import { pokeApi } from "../../api/pokeApi";
import type { MoveDetails, Pokemon } from "../../interfaces/pokemon.interface";

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

  const moveDatails = await Promise.all(
    data.moves.map(async (move) => {
      const idMove = move.move.url.split("/");
      const { data } = await pokeApi.get<MoveDetails>(
        `/move/${idMove[idMove.length - 2]}`,
      );
      return data;
    }),
  );

  return { ...data, movesDetails: moveDatails };
};
