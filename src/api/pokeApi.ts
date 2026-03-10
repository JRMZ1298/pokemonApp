import axios from "axios";

const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_API_POKE_URL,
});

export { pokeApi };
