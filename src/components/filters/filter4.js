import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const MyTable = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "John", status: "Active", age: 25 },
    { id: 2, name: "Jane", status: "Inactive", age: 30 },
    { id: 3, name: "Alice", status: "Active", age: 28 },
  ]);
  const [selected, setSelected] = useState([]);
  const [editableCell, setEditableCell] = useState(null);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleEdit = (id, column) => {
    setEditableCell({ id, column });
  };

  const handleChange = (event, id, column) => {
    const value = event.target.value;
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    );
    setEditableCell(null);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < rows.length
                }
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isSelected = selected.indexOf(row.id) !== -1;
            return (
              <TableRow
                hover
                onClick={(event) => handleRowClick(event, row.id)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={row.id}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>
                <TableCell>
                  {editableCell?.id === row.id &&
                  editableCell?.column === "name" ? (
                    <input
                      value={row.name}
                      onChange={(e) => handleChange(e, row.id, "name")}
                      autoFocus
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>
                  {editableCell?.id === row.id &&
                  editableCell?.column === "status" ? (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={row.status}
                        onChange={(e) => handleChange(e, row.id, "status")}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    row.status
                  )}
                </TableCell>
                <TableCell>
                  {editableCell?.id === row.id &&
                  editableCell?.column === "age" ? (
                    <input
                      type="number"
                      value={row.age}
                      onChange={(e) => handleChange(e, row.id, "age")}
                      autoFocus
                    />
                  ) : (
                    row.age
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row.id, "name")}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(row.id, "status")}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(row.id, "age")}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
