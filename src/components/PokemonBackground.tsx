import { Box } from "@mui/material";

export const PokemonBackground = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "linear-gradient(135deg, #0d0d1a 0%, #0a1628 50%, #0d0d1a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79,195,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,195,247,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Pokéball silhouette top-right */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "40px solid rgba(255,107,53,0.06)",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: -40,
            right: -40,
            height: "40px",
            marginTop: "-20px",
            background: "rgba(255,107,53,0.05)",
          },
        }}
      />

      {/* Pokéball silhouette bottom-left */}
      <Box
        sx={{
          position: "absolute",
          bottom: -180,
          left: -180,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "50px solid rgba(79,195,247,0.05)",
        }}
      />

      {/* Center radial glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
