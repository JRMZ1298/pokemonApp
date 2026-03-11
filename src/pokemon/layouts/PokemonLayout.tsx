import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";

//Layout de la pagina principal
export const PokemonLayout = () => {
  return (
    <>
      {/* Header/Barra de navegacion */}
      <CustomHeader />
      {/* Contenido principal */}
      <Outlet />
    </>
  );
};
