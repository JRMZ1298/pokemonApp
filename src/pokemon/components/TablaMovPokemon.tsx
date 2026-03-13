import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import type { Pokemon } from "../../interfaces/pokemon.interface";
import { Box, Typography } from "@mui/material";

interface Column {
  id: "name" | "power" | "pp" | "accuracy" | "damage_class" | "target" | "type";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "power", label: "Poder", minWidth: 50 },
  { id: "pp", label: "PP", minWidth: 50 },
  { id: "accuracy", label: "%Golpear", minWidth: 70 },
  { id: "damage_class", label: "Clase de daño", minWidth: 100 },
  { id: "target", label: "Objetivo", minWidth: 100 },
  { id: "type", label: "Tipo de ataque", minWidth: 100 },
];

interface Props {
  pokemon: Pokemon;
}

export const TablaMovPokemon: React.FC<Props> = ({ pokemon }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Trebuchet MS', sans-serif",
          fontWeight: 900,
          letterSpacing: 3,
          color: "#fff",
          textTransform: "uppercase",
          textShadow: "0 0 20px #4FC3F766",
        }}
      >
        Movimientos
      </Typography>
      <Paper
        sx={{
          width: { xs: "100%", sm: "80%", md: "60%" },
          overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      background: "rgb(19, 30, 61)",
                      color: "#fff",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      fontSize: "0.7rem",
                      borderBottom: "2px solid rgba(79, 110, 247, 0.4)",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemon.movesDetails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      background:
                        index % 2 === 0
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,255,255,0.01)",
                      transition: "background 0.2s",
                      "&:hover": {
                        background: "rgba(79,195,247,0.1) !important",
                      },
                      "&:last-child td": { borderBottom: "none" },
                    }}
                  >
                    {columns.map((column) => {
                      let value;
                      switch (column.id) {
                        case "name":
                          value = row.names[5].name;
                          break;
                        case "power":
                          value = row.power;
                          break;
                        case "pp":
                          value = row.pp;
                          break;
                        case "accuracy":
                          value = String(row.accuracy + " %");
                          break;
                        case "damage_class":
                          value = row.damage_class.name;
                          break;
                        case "target":
                          value = row.target.name;
                          break;
                        case "type":
                          value = row.type.name;
                          break;
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            color: "#ffffffdd",
                            fontFamily: "monospace",
                            fontSize: "0.85rem",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            textTransform: "capitalize",
                          }}
                        >
                          {value || "N/A"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pokemon.moves.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: "#ffffffaa",
            fontFamily: "monospace",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(79,195,247,0.05)",
            ".MuiTablePagination-select": { color: "#4FC3F7" },
            ".MuiTablePagination-selectIcon": { color: "#4FC3F7" },
            ".MuiIconButton-root": {
              color: "#4FC3F7",
              "&.Mui-disabled": { color: "#ffffff22" },
            },
          }}
        />
      </Paper>
    </Box>
  );
};
