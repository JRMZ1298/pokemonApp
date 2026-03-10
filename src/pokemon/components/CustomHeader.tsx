import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router";
import { Slide, useScrollTrigger } from "@mui/material";
import { useRef } from "react";

export const CustomHeader = () => {
  const limitRef = useRef<HTMLInputElement>(null);
  const offsetRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  //Trigger para validar cuando ocultar o cuando mostrar la barra de navegacion
  const trigger = useScrollTrigger();

  /**
   * Función para actualizar los searchParams de limit u offset cuando se presiono Enter o se dio clic en el boton de Buscar
   */
  const handleApply = () => {
    const limit = limitRef.current?.value || 12;
    const offset = offsetRef.current?.value || 0;

    const parsedLimit = isNaN(+limit) || +limit <= 0 ? 12 : +limit;
    const parsedOffset = isNaN(+offset) || +offset < 0 ? 0 : +offset;

    setSearchParams({
      limit: String(parsedLimit),
      offset: String(parsedOffset),
    });
  };

  return (
    // Componente para mostrar/ocultar la barra
    <Slide appear={false} direction="down" in={!trigger}>
      {/* Barra de navegación */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(10, 22, 40, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(79,195,247,0.12)",
          marginBottom: "10px",
        }}
      >
        <Toolbar sx={{ gap: 2, flexWrap: "wrap", py: 1 }}>
          {/* Logo de Pokedex */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Trebuchet MS', sans-serif",
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#fff",
              textShadow: "0 0 20px #4FC3F766",
              flexGrow: 1,
            }}
          >
            Pokédex
          </Typography>

          {/* Inputs para cambiar los parametros de limit y offset */}
          {[
            {
              label: "Limit",
              refInput: limitRef,
              default: searchParams.get("limit") || 12,
            },
            {
              label: "Offset",
              refInput: offsetRef,
              default: searchParams.get("offset") || 0,
            },
          ].map(({ label, refInput, default: defaultValue }) => (
            <TextField
              key={label}
              inputRef={refInput}
              label={label}
              defaultValue={defaultValue}
              size="small"
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              sx={{
                width: 90,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  fontFamily: "monospace",
                  "& fieldset": { borderColor: "rgba(79,195,247,0.25)" },
                  "&:hover fieldset": { borderColor: "rgba(79,195,247,0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#4FC3F7" },
                },
                "& .MuiInputLabel-root": { color: "rgba(79,195,247,0.6)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#4FC3F7" },
              }}
            />
          ))}

          {/* Button de buscar */}
          <Button
            onClick={handleApply}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "rgba(79,195,247,0.4)",
              color: "#4FC3F7",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontFamily: "monospace",
              px: 2,
              "&:hover": {
                borderColor: "#4FC3F7",
                background: "rgba(79,195,247,0.08)",
              },
            }}
          >
            Buscar
          </Button>

          {/* Button de login */}
          <Button
            onClick={() => alert("Intentando acceder")}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "rgba(247, 79, 79, 0.4)",
              color: "#f74f4f",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontFamily: "monospace",
              px: 2,
              "&:hover": {
                borderColor: "#f74f4f",
                background: "rgba(79,195,247,0.08)",
              },
            }}
          >
            Acceder
          </Button>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
