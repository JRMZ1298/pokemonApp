import {
  createUserWithEmailAndPassword,
  deleteUser,
  type User,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export const registerAction = async (
  email: string,
  password: string,
): Promise<User> => {
  //Crear usuario en auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  //Crear el perfil en Firestore
  try {
    // Agregar documento nuevo
    const userRef = await doc(collection(db, "users"));

    // Actualizar el documento con la info del usuario
    await setDoc(userRef, {
      uid: userRef.id,
      correo: userCredential.user.email,
      favoritos: [],
    });
  } catch {
    deleteUser(userCredential.user);
  }

  return userCredential.user;
};
