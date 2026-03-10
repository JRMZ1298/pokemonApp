import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        gap: 2,
      }}
    >
      <CircularProgress size={48} thickness={3} sx={{ color: "#4FC3F7" }} />
      <Typography
        sx={{
          color: "#ffffff44",
          fontFamily: "monospace",
          letterSpacing: 3,
          fontSize: "0.75rem",
          textTransform: "uppercase",
        }}
      >
        Cargando...
      </Typography>
    </Box>
  );
};
