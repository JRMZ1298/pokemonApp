import axios from "axios";

//Se prepara la Api que se va a usar
const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_API_POKE_URL,
});

export { pokeApi };
