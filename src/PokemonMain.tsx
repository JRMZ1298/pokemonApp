import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonBackground } from "./components/PokemonBackground";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./auth/store/auth.store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const PokemonMain: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#070505",
            borderColor: "#0f0f0f",
          },
        }}
        richColors={true}
      />
      <PokemonBackground />
      <RouterProvider router={appRouter} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
