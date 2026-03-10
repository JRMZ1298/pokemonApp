import { Box, CircularProgress } from "@mui/material";
import { CardGridPokemon } from "../../components/CardGridPokemon";
import { usePokemons } from "../../hooks/usePokemons";
import { useEffect, useRef } from "react";
import type { Pokemon } from "../../../interfaces/pokemon.interface";

export const HomePage: React.FC = () => {
  // Peticion de la informacion con TanStackQuery
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePokemons();
  const divObservado = useRef<HTMLDivElement>(null);

  //El useEffect se utiliza para ejecutar la solicitud de nueva informacion cuando el observer vizualiza en pantalla el div final
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.3 },
    );

    if (divObservado.current) observer.observe(divObservado.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // La data es trasnformada a tipo Pokemon[]
  const pokemons: Pokemon[] = data?.pages.flat() ?? [];

  return (
    <>
      {/* Grid contenedor de las cartas pokemon */}
      <CardGridPokemon pokemons={pokemons} />

      {/* Div observado cuando entra al viewport carga más pokemon*/}
      <Box ref={divObservado} sx={{ height: 40, gridColumn: "1 / -1" }} />

      {/* Spinner de carga */}
      {isFetchingNextPage && (
        <Box sx={{ textAlign: "center", gridColumn: "1 / -1", py: 2 }}>
          <CircularProgress size={24} sx={{ color: "#4FC3F7" }} />
        </Box>
      )}

      {/* Boton de cargar mas */}
      {/* {hasNextPage && (
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
      )} */}
    </>
  );
};
