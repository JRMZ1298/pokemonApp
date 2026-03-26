import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

//Layout de la pagina principal
export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Agregar un boton de regresar a la pantalla principal */}
      <Button
        variant="text"
        sx={{
          m: 2,
          ml: "auto",
          display: "block",
          color: "#4FC3F7",
          borderColor: "#4FC3F7",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          textShadow: "0 0 30px rgba(111, 204, 247, 0.6)",
          lineHeight: 1,
          "&:hover": {
            borderColor: "#0288d1",
            background: "rgba(79,195,247,0.07)",
          },
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        {"< Regresar"}
      </Button>

      {/* Contenido principal */}
      <Outlet />
    </>
  );
};
