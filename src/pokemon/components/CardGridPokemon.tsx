import { Box, keyframes } from "@mui/material";
import type { Pokemon } from "../../interfaces/pokemon.interface";
import { CardPokemon } from "./CardPokemon";

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

interface Props {
  pokemons: Pokemon[];
}

export const CardGridPokemon: React.FC<Props> = ({ pokemons }) => {
  return (
    <>
      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
          position: "relative",
          zIndex: 1,
          justifyItems: "center",
        }}
      >
        {pokemons.map((pokemon, index) => (
          <Box
            key={pokemon.id}
            sx={{
              animation: `${fadeSlideIn} 0.5s ease forwards`,
              animationDelay: `${(index % 10) * 60}ms`,
              opacity: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardPokemon pokemon={pokemon} />
          </Box>
        ))}
      </Box>
    </>
  );
};
