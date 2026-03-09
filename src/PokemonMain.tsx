import type { Pokemon } from "./pokemon/interfaces/pokemon.interface";

export const PokemonMain: React.FC = () => {
  const pokemons: Pokemon[] = [
    { name: "Bulbasur", type: "Planta", img: "" },
    { name: "Picachu", type: "Electrico", img: "" },
    { name: "Charmander", type: "Fuego", img: "" },
  ];

  return <div></div>;
};
