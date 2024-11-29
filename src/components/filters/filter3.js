// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Autocomplete,
//   Paper,
// } from "@mui/material";

// const initialData = [
//   {
//     id: 1,
//     name: "Alice",
//     department: "HR",
//     location: "New York",
//     status: "Active",
//     role: "Manager",
//     date: "2023-10-01",
//   },
//   {
//     id: 2,
//     name: "Bob",
//     department: "Engineering",
//     location: "San Francisco",
//     status: "Inactive",
//     role: "Engineer",
//     date: "2023-11-15",
//   },
//   {
//     id: 3,
//     name: "Charlie",
//     department: "HR",
//     location: "New York",
//     status: "Active",
//     role: "Recruiter",
//     date: "2023-09-12",
//   },
//   {
//     id: 4,
//     name: "Diana",
//     department: "Engineering",
//     location: "Los Angeles",
//     status: "Active",
//     role: "Manager",
//     date: "2023-08-20",
//   },
//   {
//     id: 5,
//     name: "Eve",
//     department: "HR",
//     location: "Los Angeles",
//     status: "Inactive",
//     role: "HR Specialist",
//     date: "2023-07-05",
//   },
//   // Add more data as needed
// ];

// const departments = ["HR", "Engineering"];
// const locations = ["New York", "San Francisco", "Los Angeles"];
// const statuses = ["Active", "Inactive"];
// const roles = ["Manager", "Engineer", "Recruiter", "HR Specialist"];

// function BigTableWithFilters() {
//   const [filters, setFilters] = useState({
//     department: [],
//     location: [],
//     status: [],
//     role: [],
//     date: null,
//   });

//   const handleFilterChange = (filterKey, values) => {
//     setFilters((prev) => ({ ...prev, [filterKey]: values }));
//   };

//   const filteredData = initialData.filter(
//     (row) =>
//       (filters.department.length === 0 ||
//         filters.department.includes(row.department)) &&
//       (filters.location.length === 0 ||
//         filters.location.includes(row.location)) &&
//       (filters.status.length === 0 || filters.status.includes(row.status)) &&
//       (filters.role.length === 0 || filters.role.includes(row.role)) &&
//       (!filters.date || new Date(row.date) >= new Date(filters.date))
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           marginBottom: "20px",
//           flexWrap: "wrap",
//         }}
//       >
//         <Autocomplete
//           multiple
//           options={departments}
//           onChange={(e, value) => handleFilterChange("department", value)}
//           renderInput={(params) => (
//             <TextField {...params} label="Filter by Department" />
//           )}
//         />
//         <Autocomplete
//           multiple
//           options={locations}
//           onChange={(e, value) => handleFilterChange("location", value)}
//           renderInput={(params) => (
//             <TextField {...params} label="Filter by Location" />
//           )}
//         />
//         <Autocomplete
//           multiple
//           options={statuses}
//           onChange={(e, value) => handleFilterChange("status", value)}
//           renderInput={(params) => (
//             <TextField {...params} label="Filter by Status" />
//           )}
//         />
//         <Autocomplete
//           multiple
//           options={roles}
//           onChange={(e, value) => handleFilterChange("role", value)}
//           renderInput={(params) => (
//             <TextField {...params} label="Filter by Role" />
//           )}
//         />
//         <TextField
//           label="Filter by Date (After)"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           onChange={(e) => handleFilterChange("date", e.target.value)}
//         />
//       </div>
//       <TableContainer
//         component={Paper}
//         style={{ maxHeight: "400px", overflow: "auto" }}
//       >
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Department</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.id}</TableCell>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>{row.department}</TableCell>
//                   <TableCell>{row.location}</TableCell>
//                   <TableCell>{row.status}</TableCell>
//                   <TableCell>{row.role}</TableCell>
//                   <TableCell>{row.date}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No matching data
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default BigTableWithFilters;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
  Paper,
  Button,
  Drawer,
  Box,
} from "@mui/material";

const initialData = [
  {
    id: 1,
    name: "Alice",
    department: "HR",
    location: "New York",
    status: "Active",
    role: "Manager",
    date: "2023-10-01",
  },
  {
    id: 2,
    name: "Bob",
    department: "Engineering",
    location: "San Francisco",
    status: "Inactive",
    role: "Engineer",
    date: "2023-11-15",
  },
  {
    id: 3,
    name: "Charlie",
    department: "HR",
    location: "New York",
    status: "Active",
    role: "Recruiter",
    date: "2023-09-12",
  },
  {
    id: 4,
    name: "Diana",
    department: "Engineering",
    location: "Los Angeles",
    status: "Active",
    role: "Manager",
    date: "2023-08-20",
  },
  {
    id: 5,
    name: "Eve",
    department: "HR",
    location: "Los Angeles",
    status: "Inactive",
    role: "HR Specialist",
    date: "2023-07-05",
  },
];

const departments = ["HR", "Engineering"];
const locations = ["New York", "San Francisco", "Los Angeles"];
const statuses = ["Active", "Inactive"];
const roles = ["Manager", "Engineer", "Recruiter", "HR Specialist"];

function TableWithDrawerFilters() {
  const [filters, setFilters] = useState({
    department: [],
    location: [],
    status: [],
    role: [],
    date: null,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (filterKey, values) => {
    setFilters((prev) => ({ ...prev, [filterKey]: values }));
  };

  const filteredData = initialData.filter(
    (row) =>
      (filters.department.length === 0 ||
        filters.department.includes(row.department)) &&
      (filters.location.length === 0 ||
        filters.location.includes(row.location)) &&
      (filters.status.length === 0 || filters.status.includes(row.status)) &&
      (filters.role.length === 0 || filters.role.includes(row.role)) &&
      (!filters.date || new Date(row.date) >= new Date(filters.date))
  );

  return (
    <div style={{ padding: "20px" }}>
      <Button variant="contained" onClick={() => setDrawerOpen(true)}>
        Open Filters
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box p={3} width="300px" role="presentation">
          <h3>Filters</h3>
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
          <Autocomplete
            multiple
            options={statuses}
            onChange={(e, value) => handleFilterChange("status", value)}
            renderInput={(params) => (
              <TextField {...params} label="Filter by Status" />
            )}
          />
          <Autocomplete
            multiple
            options={roles}
            onChange={(e, value) => handleFilterChange("role", value)}
            renderInput={(params) => (
              <TextField {...params} label="Filter by Role" />
            )}
          />
          <TextField
            label="Filter by Date (After)"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            fullWidth
            style={{ marginTop: "20px" }}
          />
          <Button
            variant="outlined"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={() => setDrawerOpen(false)}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No matching data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableWithDrawerFilters;
