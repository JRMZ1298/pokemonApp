import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import type { Evolution } from "../../interfaces/pokemon.evolution-chain";

interface Props {
  evolutions: Evolution[];
  currentName: string;
}

export const PokemonEvolutions = ({ evolutions, currentName }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        marginBottom: "1.5rem",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Trebuchet MS', sans-serif",
          fontWeight: 900,
          letterSpacing: 3,
          color: "#fff",
          textTransform: "uppercase",
          textShadow: "0 0 20px #4FC3F766",
        }}
      >
        Evoluciones
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
        }}
      >
        {evolutions.map((evo, index) => {
          const isCurrent = evo.name === currentName;

          return (
            <Box
              key={evo.name}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              {/* Card de evolución */}
              <Box
                onClick={() => navigate(`/pokemon/${evo.name}`)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  background: isCurrent
                    ? "rgba(79,195,247,0.12)"
                    : "rgba(255,255,255,0.03)",
                  border: isCurrent
                    ? "1px solid rgba(79,195,247,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isCurrent
                    ? "0 0 20px rgba(79,195,247,0.15)"
                    : "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(79,195,247,0.1)",
                    border: "1px solid rgba(79,195,247,0.4)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Imagen */}
                <Box
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    borderRadius: "50%",
                    background: isCurrent
                      ? "rgba(79,195,247,0.1)"
                      : "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                    alt={evo.name}
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Nombre */}
                <Typography
                  sx={{
                    color: isCurrent ? "#4FC3F7" : "#ffffffaa",
                    fontFamily: "monospace",
                    fontWeight: isCurrent ? 700 : 400,
                    textTransform: "capitalize",
                    fontSize: "0.85rem",
                    letterSpacing: 1,
                  }}
                >
                  {evo.name}
                </Typography>

                {/* Nivel de evolución */}
                {evo.minLevel && (
                  <Typography
                    sx={{
                      color: "#ffffff44",
                      fontFamily: "monospace",
                      fontSize: "0.7rem",
                      letterSpacing: 1,
                    }}
                  >
                    Lvl {evo.minLevel}
                  </Typography>
                )}
              </Box>

              {/* Flecha entre evoluciones */}
              {index < evolutions.length - 1 && (
                <ArrowForwardIcon
                  sx={{
                    color: "rgba(79,195,247,0.3)",
                    fontSize: { xs: 20, sm: 28 },
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
