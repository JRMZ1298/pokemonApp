import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Box,
  Drawer,
  IconButton,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { HeaderControls } from "./HeaderControls";
import { Close, Menu } from "@mui/icons-material";

export const CustomHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  //Trigger para validar cuando ocultar o cuando mostrar la barra de navegacion
  const trigger = useScrollTrigger();

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Componente para mostrar/ocultar la barra */}
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
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Pokédex
            </Typography>

            {isHome && (
              <>
                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <HeaderControls setDrawerOpen={setDrawerOpen} />
                </Box>

                {/* Icono de Menu */}
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ display: { xs: "flex", sm: "none" }, color: "#4FC3F7" }}
                >
                  <Menu />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Menu para vista celular */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              background: "rgba(10, 22, 40, 0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(79,195,247,0.15)",
              px: 3,
              py: 3,
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
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
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Pokédex
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#4FC3F755" }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Controles */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <HeaderControls setDrawerOpen={setDrawerOpen} />
        </Box>
      </Drawer>
    </>
  );
};
