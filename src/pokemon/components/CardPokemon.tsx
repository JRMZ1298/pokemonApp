import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import type { Pokemon } from "../../interfaces/pokemon.interface";

interface Props {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  fire: "#FF6B35",
  water: "#4FC3F7",
  grass: "#81C784",
  electric: "#FFD54F",
  psychic: "#F48FB1",
  ice: "#80DEEA",
  dragon: "#7E57C2",
  dark: "#546E7A",
  fairy: "#F8BBD9",
  normal: "#BCAAA4",
  fighting: "#EF5350",
  flying: "#90CAF9",
  poison: "#CE93D8",
  ground: "#FFCC80",
  rock: "#A1887F",
  bug: "#AED581",
  ghost: "#7986CB",
  steel: "#B0BEC5",
};

export const CardPokemon: React.FC<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const accentColor = "#4d4d4d";

  return (
    <Card
      sx={{
        width: 220,
        borderRadius: "20px",
        background: "#1a1a2e",
        boxShadow: `0 8px 32px ${accentColor}33`,
        border: `1px solid ${accentColor}44`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 16px 40px ${accentColor}66`,
        },
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glow circle behind image */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* Pokédex number */}
      <Typography
        sx={{
          position: "absolute",
          top: 12,
          left: 16,
          fontSize: "0.7rem",
          fontWeight: 700,
          color: `whitesmoke`,
          fontFamily: "monospace",
          letterSpacing: 1,
          zIndex: 2,
        }}
      >
        #{String(pokemon.id).padStart(3, "0")}
      </Typography>

      <CardActionArea sx={{ zIndex: 1, background: "transparent" }}>
        <CardMedia
          component="img"
          image={pokemon.sprites.other?.["official-artwork"].front_default}
          alt={pokemon.name}
          sx={{
            height: 160,
            objectFit: "contain",
            pt: 2,
            position: "relative",
            zIndex: 1,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
          }}
        />

        <CardContent sx={{ pb: 0 }}>
          {/* Name */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Trebuchet MS', sans-serif",
              fontWeight: 800,
              color: "#ffffff",
              textTransform: "capitalize",
              letterSpacing: 0.5,
              textAlign: "center",
              mb: 1,
            }}
          >
            {pokemon.name}
          </Typography>

          {/* Types */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              justifyContent: "center",
              mb: 1.5,
            }}
          >
            {pokemon.types?.map((type) => (
              <Chip
                key={type.type.name}
                label={type.type.name}
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  height: 22,
                  color: typeColors[type.type.name] ?? "#BCAAA4",
                }}
              />
            ))}
          </Box>

          {/* Stats row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              background: "#ffffff0d",
              borderRadius: "12px",
              py: 1,
              mb: 0.5,
            }}
          >
            {[
              { label: "Height", value: `${pokemon.height / 10}m` },
              { label: "Weight", value: `${pokemon.weight / 10}kg` },
            ].map((stat) => (
              <Box key={stat.label} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    color: "#ffffff55",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}
                >
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Favorite button */}
      <CardActions sx={{ justifyContent: "center", pt: 0.5, pb: 1.5 }}>
        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          size="small"
          sx={{
            color: isFavorite ? "#FF6B6B" : "#ffffff44",
            transition: "all 0.2s",
            "&:hover": { color: "#FF6B6B", transform: "scale(1.2)" },
          }}
        >
          {isFavorite ? (
            <Favorite fontSize="small" />
          ) : (
            <FavoriteBorder fontSize="small" />
          )}
        </IconButton>
        <Typography sx={{ fontSize: "0.75rem", color: "#ffffff66" }}>
          {isFavorite ? "Favorito" : "Agregar"}
        </Typography>
      </CardActions>
    </Card>
  );
};
