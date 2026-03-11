import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useSearchParams } from "react-router";

interface Props {
  setDrawerOpen: (value: boolean) => void;
}

export const HeaderControls: React.FC<Props> = ({ setDrawerOpen }) => {
  const limitRef = useRef<HTMLInputElement>(null);
  const offsetRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Función para actualizar los searchParams de limit u offset cuando se presiono Enter o se dio clic en el boton de Buscar
   */
  const handleApply = () => {
    const limit = limitRef.current?.value || 12;
    const offset = offsetRef.current?.value || 0;

    const parsedLimit = isNaN(+limit) || +limit <= 0 ? 12 : +limit;
    const parsedOffset = isNaN(+offset) || +offset < 0 ? 0 : +offset;

    setSearchParams({
      limit: String(parsedLimit),
      offset: String(parsedOffset),
    });
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Inputs para cambiar los parametros de limit y offset */}
      {[
        {
          label: "Limit",
          refInput: limitRef,
          default: searchParams.get("limit") || 12,
        },
        {
          label: "Offset",
          refInput: offsetRef,
          default: searchParams.get("offset") || 0,
        },
      ].map(({ label, refInput, default: defaultValue }) => (
        <TextField
          key={label}
          inputRef={refInput}
          label={label}
          defaultValue={defaultValue}
          size="small"
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          sx={{
            width: 90,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              fontFamily: "monospace",
              "& fieldset": { borderColor: "rgba(79,195,247,0.25)" },
              "&:hover fieldset": {
                borderColor: "rgba(79,195,247,0.5)",
              },
              "&.Mui-focused fieldset": { borderColor: "#4FC3F7" },
            },
            "& .MuiInputLabel-root": { color: "rgba(79,195,247,0.6)" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#4FC3F7" },
          }}
        />
      ))}

      {/* Button de buscar */}
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
    </>
  );
};
