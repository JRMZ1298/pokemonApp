// pages/LoginPage.tsx
import { useRef } from "react";
import { useNavigate, Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { keyframes } from "@mui/material";
import { useAuthStore } from "../../store/auth.store";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    fontFamily: "monospace",
    "& fieldset": { borderColor: "rgba(79,195,247,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(79,195,247,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#4FC3F7" },
  },
  "& .MuiInputLabel-root": { color: "rgba(79,195,247,0.6)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#4FC3F7" },
};

export const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!email || !password) return;

    await login(email, password);
    if (!useAuthStore.getState().error) navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            animation: `${fadeUp} 0.5s ease forwards`,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography
              sx={{
                fontFamily: "'Trebuchet MS', sans-serif",
                fontWeight: 900,
                fontSize: "2.5rem",
                letterSpacing: 4,
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 0 30px #4FC3F766",
                lineHeight: 1,
              }}
            >
              Pokédex
            </Typography>
            <Typography
              sx={{
                color: "#ffffff44",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                letterSpacing: 3,
                textTransform: "uppercase",
                mt: 1,
              }}
            >
              Inicia sesión para continuar
            </Typography>
          </Box>

          {/* Card */}
          <Box
            sx={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(79,195,247,0.15)",
              borderRadius: "20px",
              p: { xs: 3, sm: 4 },
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {error && (
              <Alert
                severity="error"
                onClose={clearError}
                sx={{
                  background: "rgba(239,83,80,0.1)",
                  border: "1px solid rgba(239,83,80,0.3)",
                  color: "#ef5350",
                  fontFamily: "monospace",
                  "& .MuiAlert-icon": { color: "#ef5350" },
                  "& .MuiIconButton-root": { color: "#ef5350" },
                }}
              >
                {error}
              </Alert>
            )}

            <TextField
              label="Correo"
              type="email"
              inputRef={emailRef}
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              sx={inputSx}
            />

            <TextField
              label="Contraseña"
              type="password"
              inputRef={passwordRef}
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              sx={inputSx}
            />

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #4FC3F7, #0288d1)",
                color: "#fff",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                py: 1.5,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(79,195,247,0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #81d4fa, #4FC3F7)",
                  boxShadow: "0 4px 28px rgba(79,195,247,0.5)",
                },
                "&.Mui-disabled": {
                  background: "rgba(79,195,247,0.2)",
                  color: "#ffffff44",
                },
              }}
            >
              {isLoading ? "Cargando..." : "Entrar"}
            </Button>
          </Box>

          {/* Link a registro */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#ffffff44",
              fontFamily: "monospace",
              fontSize: "0.8rem",
            }}
          >
            ¿No tienes cuenta?{" "}
            <Link
              to="/auth/register"
              style={{
                color: "#4FC3F7",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Regístrate
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};
