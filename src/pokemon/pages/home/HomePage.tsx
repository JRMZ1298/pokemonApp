import { Box, Button, CircularProgress } from "@mui/material";
import { CardGridPokemon } from "../../components/CardGridPokemon";
import { usePokemons } from "../../hooks/usePokemons";

export const HomePage: React.FC = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePokemons();
  const pokemons = data?.pages.flat() ?? [];

  return (
    <>
      <CardGridPokemon pokemons={pokemons} />

      {hasNextPage && (
        <Box
          sx={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "center",
            py: 4,
          }}
        >
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outlined"
            sx={{
              borderColor: "rgba(79,195,247,0.4)",
              color: "#4FC3F7",
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: "monospace",
              px: 4,
              "&:hover": {
                borderColor: "#4FC3F7",
                background: "rgba(79,195,247,0.08)",
              },
            }}
          >
            {isFetchingNextPage ? (
              <CircularProgress size={20} sx={{ color: "#4FC3F7" }} />
            ) : (
              "Cargar más"
            )}
          </Button>
        </Box>
      )}
    </>
  );
};
