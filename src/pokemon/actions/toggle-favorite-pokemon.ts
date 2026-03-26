import { db } from "../../firebase/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export const addFavoriteAction = (userId: string, pokemonId: number) =>
  setDoc(doc(db, "favorites", userId, "pokemons", String(pokemonId)), {
    pokemonId,
  });

export const removeFavoriteAction = (userId: string, pokemonId: number) =>
  deleteDoc(doc(db, "favorites", userId, "pokemons", String(pokemonId)));

export const getFavoritesAction = async (userId: string): Promise<number[]> => {
  const snap = await getDocs(collection(db, "favorites", userId, "pokemons"));
  return snap.docs.map((doc) => Number(doc.id));
};
