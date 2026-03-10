import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Slide, useScrollTrigger } from "@mui/material";

export const CustomHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [limit, setLimit] = useState(searchParams.get("limit") ?? "12");
  const [offset, setOffset] = useState(searchParams.get("offset") ?? "0");
  const trigger = useScrollTrigger();

  const handleApply = () => {
    const parsedLimit = isNaN(+limit) || +limit <= 0 ? 12 : +limit;
    const parsedOffset = isNaN(+offset) || +offset < 0 ? 0 : +offset;

    setSearchParams({
      limit: String(parsedLimit),
      offset: String(parsedOffset),
    });
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(10, 22, 40, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(79,195,247,0.12)",
          marginBottom: "10px",
        }}
      >
        <Toolbar sx={{ gap: 2, flexWrap: "wrap", py: 1 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Trebuchet MS', sans-serif",
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#fff",
              textShadow: "0 0 20px #4FC3F766",
              flexGrow: 1,
            }}
          >
            Pokédex
          </Typography>

          {/* Inputs */}
          {[
            { label: "Limit", value: limit, setter: setLimit },
            { label: "Offset", value: offset, setter: setOffset },
          ].map(({ label, value, setter }) => (
            <TextField
              key={label}
              label={label}
              value={value}
              size="small"
              onChange={(e) => setter(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              sx={{
                width: 90,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  fontFamily: "monospace",
                  "& fieldset": { borderColor: "rgba(79,195,247,0.25)" },
                  "&:hover fieldset": { borderColor: "rgba(79,195,247,0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#4FC3F7" },
                },
                "& .MuiInputLabel-root": { color: "rgba(79,195,247,0.6)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#4FC3F7" },
              }}
            />
          ))}

          {/* Button */}
          <Button
            onClick={handleApply}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "rgba(79,195,247,0.4)",
              color: "#4FC3F7",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              fontFamily: "monospace",
              px: 2,
              "&:hover": {
                borderColor: "#4FC3F7",
                background: "rgba(79,195,247,0.08)",
              },
            }}
          >
            Buscar
          </Button>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
