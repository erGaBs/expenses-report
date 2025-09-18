import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Toolbar,
  Typography,
  TableSortLabel,
  TablePagination,
  Chip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import expensesService from "../api/expensesService";

// 🔹 Funzione per ordinamento
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// 🔹 Colonne della tabella
const headCells = [
  { id: "description", numeric: false, disablePadding: true, label: "Descrizione" },
  { id: "amount", numeric: true, disablePadding: false, label: "Importo (€)" },
  { id: "category", numeric: false, disablePadding: false, label: "Categoria" },
  { id: "type", numeric: false, disablePadding: false, label: "Tipo" },
  { id: "date", numeric: false, disablePadding: false, label: "Data" },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ color: "#fff" }}>
          <Checkbox color="primary" />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ color: "white !important", // testo
                "& .MuiTableSortLabel-icon": {
                  color: "white !important", // freccette
                }, }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "ordinato decrescente" : "ordinato crescente"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 🔹 Caricamento spese dal backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expensesService.getExpenses();
        setExpenses(data);
        console.log("Spese caricate:", data);
      } catch (err) {
        console.error("Errore nel caricamento spese:", err);
      }
    };
    fetchExpenses();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = stableSort(expenses, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="m-5">
    <Box sx={{ width: "100%", p: 2 }}>
      <Paper sx={{ width: "100%", mb: 2, bgcolor: "#2c2c2c", color: "#fff" }}>
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%", color: "#fff" }}
            variant="h6"
            component="div"
          >
            Le mie spese
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ color: "#fff" }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "#fff" }}>
                      {row.amount} €
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      {row.category}
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.type}
                        sx={{
                          bgcolor:
                            row.type === "INCOME"
                              ? "green"
                              : "red",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left" sx={{ color: "#fff" }}>
                      {row.date}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={expenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#fff" }}
        />
      </Paper>
    </Box>
    </div>
  );
}
