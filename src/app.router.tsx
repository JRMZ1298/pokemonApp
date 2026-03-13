import { createHashRouter } from "react-router";
import { PokemonLayout } from "./pokemon/layouts/PokemonLayout";
import { HomePage } from "./pokemon/pages/home/HomePage";
import { PokemonPage } from "./pokemon/pages/pokemon/PokemonPage";

export const appRouter = createHashRouter([
  //Main Routes
  {
    path: "/",
    element: <PokemonLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "pokemon/:pokemonName",
        element: <PokemonPage />,
      },
    ],
  },
]);
