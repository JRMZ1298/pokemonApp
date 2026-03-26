import { signInWithEmailAndPassword, type User } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const loginAction = async (
  email: string,
  password: string,
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};
