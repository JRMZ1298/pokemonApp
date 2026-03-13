import { pokeApi } from "../../api/pokeApi";
import type {
  Chain,
  Evolution,
  EvolutionChain,
} from "../../interfaces/pokemon.evolution-chain";
import type { PokemonSpecies } from "../../interfaces/pokemon.species.response";

export const getPokemonEvolutionsByName = async (
  pokemonName: string,
): Promise<Evolution[]> => {
  // 1. Species tiene la url de la cadena
  const { data: species } = await pokeApi.get<PokemonSpecies>(
    `/pokemon-species/${pokemonName}`,
  );

  // 2. Extraemos el ID de la url "https://pokeapi.co/api/v2/evolution-chain/1"
  const chainId = species.evolution_chain.url.split("/").filter(Boolean).at(-1);

  // 3. Fetch de la cadena
  const { data } = await pokeApi.get<EvolutionChain>(
    `/evolution-chain/${chainId}`,
  );

  return flattenChain(data.chain);
};

const flattenChain = (link: Chain): Evolution[] => {
  const current: Evolution = {
    name: link.species.name,
    id: Number(link.species.url.split("/").filter(Boolean).at(-1)),
    minLevel: link.evolution_details[0]?.min_level ?? null,
    trigger: link.evolution_details[0]?.trigger.name ?? "base",
  };

  // si no hay más evoluciones, retorna solo el actual
  if (link.evolves_to.length === 0) return [current];

  // si hay más, se llama a sí misma con el siguiente eslabón
  const next = link.evolves_to.flatMap((evo) => flattenChain(evo));
  return [current, ...next];
};
