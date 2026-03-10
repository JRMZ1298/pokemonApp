import { CardGridPokemon } from "../../components/CardGridPokemon";
import { usePokemons } from "../../hooks/usePokemons";

export const HomePage: React.FC = () => {
  const { data: pokemons } = usePokemons();

  return (
    <>
      <CardGridPokemon pokemons={pokemons || []} />

      {/* TODO: AGREGAR BOTON DE CARGAR MAS */}
    </>
  );
};
