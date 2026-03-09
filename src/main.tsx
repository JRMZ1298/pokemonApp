import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PokemonMain } from "./PokemonMain";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonMain />
  </StrictMode>,
);
