import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";

//Layout de la pagina principal
export const PokemonLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Barra de navegacion */}
      <CustomHeader />
      {/* Contenido principal */}
      <Outlet />
    </div>
  );
};
