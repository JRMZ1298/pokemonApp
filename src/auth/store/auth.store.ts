import type { User } from "firebase/auth";
import { create } from "zustand";
import { registerAction } from "../actions/register.action";
import { loginAction } from "../actions/login.action";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "sonner";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const user = await loginAction(email, password);
      set({ user });
      toast.success("Se inicio sesion con exito");
    } catch {
      set({ error: "Correo o contraseña incorrectos" });
      toast.error("Correo o contraseña incorrectos");
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const user = await registerAction(email, password);
      set({ user });
      toast.success("Usuario creado con exito");
    } catch {
      set({ error: "No se pudo crear la cuenta, intenta con otro correo" });
      toast.error("No se pudo crear la cuenta, intenta con otro correo");
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
    toast.success("Sesion cerrada");
  },
}));
