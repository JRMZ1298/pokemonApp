import { Loading } from "../../../components/Loading";
import { PokemonEvolutions } from "../../components/PokemonEvolutions";
import { TablaMovPokemon } from "../../components/TablaMovPokemon";
import { usePokemon } from "../../hooks/usePokemon";
import { usePokemonEvolutions } from "../../hooks/usePokemonEvolutions";

export const PokemonPage: React.FC = () => {
  const { data: pokemon, isLoading } = usePokemon();
  const { data: evolutions, isLoading: isLoadingEvolution } =
    usePokemonEvolutions();

  if (isLoadingEvolution) return <Loading />;

  if (isLoading) return <Loading />;

  if (!pokemon) return null;

  return (
    <>
      {/* Agregar lista de evoluciones */}
      {evolutions && (
        <PokemonEvolutions evolutions={evolutions} currentName={pokemon.name} />
      )}
      {/* Agregar lista de movimientos en forma de tabla */}
      <TablaMovPokemon pokemon={pokemon} />
    </>
  );
};
