import { createHashRouter } from "react-router";
import { PokemonLayout } from "./pokemon/layouts/PokemonLayout";
import { HomePage } from "./pokemon/pages/home/HomePage";
import { PokemonPage } from "./pokemon/pages/pokemon/PokemonPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { AuthLayout } from "./auth/layouts/AuthLayout";
import { RegisterPage } from "./auth/pages/register/RegistroPage";

export const appRouter = createHashRouter([
  //Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
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
