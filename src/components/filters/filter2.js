import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material";

const initialData = [
  { id: 1, name: "Alice", department: "HR", location: "New York" },
  { id: 2, name: "Bob", department: "Engineering", location: "San Francisco" },
  { id: 3, name: "Charlie", department: "HR", location: "New York" },
  { id: 4, name: "Diana", department: "Engineering", location: "Los Angeles" },
];

function ChipFilterTable() {
  const [filters, setFilters] = useState([]);
  const [data, setData] = useState(initialData);

  const handleAddFilter = (filter) => {
    setFilters((prev) => [...new Set([...prev, filter])]);
  };

  const handleRemoveFilter = (filter) => {
    setFilters((prev) => prev.filter((item) => item !== filter));
  };

  const filteredData = data.filter(
    (row) =>
      filters.length === 0 ||
      filters.includes(row.department) ||
      filters.includes(row.location)
  );

  return (
    <div>
      <Box mb={2}>
        {["HR", "Engineering", "New York", "San Francisco", "Los Angeles"].map(
          (filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => handleAddFilter(filter)}
              style={{ margin: "5px" }}
              color={filters.includes(filter) ? "primary" : "default"}
            />
          )
        )}
      </Box>
      <Box mb={2}>
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onDelete={() => handleRemoveFilter(filter)}
            color="secondary"
            style={{ margin: "5px" }}
          />
        ))}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ChipFilterTable;
