import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
} from "@mui/material";

const initialData = [
  { id: 1, name: "Alice", department: "HR", location: "New York" },
  { id: 2, name: "Bob", department: "Engineering", location: "San Francisco" },
  { id: 3, name: "Charlie", department: "HR", location: "New York" },
  { id: 4, name: "Diana", department: "Engineering", location: "Los Angeles" },
];

const departments = ["HR", "Engineering"];
const locations = ["New York", "San Francisco", "Los Angeles"];

function MultiSelectTable() {
  const [filters, setFilters] = useState({ department: [], location: [] });
  const [data, setData] = useState(initialData);

  const handleFilterChange = (filterKey, values) => {
    setFilters((prev) => ({ ...prev, [filterKey]: values }));
  };

  const filteredData = data.filter(
    (row) =>
      (filters.department.length === 0 ||
        filters.department.includes(row.department)) &&
      (filters.location.length === 0 || filters.location.includes(row.location))
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Autocomplete
          multiple
          options={departments}
          onChange={(e, value) => handleFilterChange("department", value)}
          renderInput={(params) => (
            <TextField {...params} label="Filter by Department" />
          )}
        />
        <Autocomplete
          multiple
          options={locations}
          onChange={(e, value) => handleFilterChange("location", value)}
          renderInput={(params) => (
            <TextField {...params} label="Filter by Location" />
          )}
        />
      </div>
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

export default MultiSelectTable;
