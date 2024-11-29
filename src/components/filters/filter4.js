// import React, { useState, useEffect } from "react";
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
//   Button,
//   Drawer,
//   Box,
// } from "@mui/material";
// import axios from "axios";

// function DepartmentTableWithFilters() {
//   const [filters, setFilters] = useState({
//     department: [],
//     location: [],
//     status: [],
//     role: [],
//     date: null,
//   });
//   const [data, setData] = useState([]);
//   console.log(data, "DataMY");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Fetch data from the API with filters
//   const fetchData = async () => {
//     try {
//       const requestBody = {
//         department: filters.department,
//         location: filters.location,
//         status: filters.status,
//         role: filters.role,
//         date: filters.date,
//       };
//       const response = await axios.post(
//         "http://localhost:7779/departments",
//         requestBody
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Fetch data when filters change
//   useEffect(() => {
//     fetchData();
//   }, [filters]);

//   const handleFilterChange = (filterKey, values) => {
//     setFilters((prev) => ({ ...prev, [filterKey]: values }));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Button variant="contained" onClick={() => setDrawerOpen(true)}>
//         Open Filters
//       </Button>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box p={3} width="300px" role="presentation">
//           <h3>Filters</h3>
//           <Autocomplete
//             multiple
//             options={["HR", "Engineering"]}
//             onChange={(e, value) => handleFilterChange("department", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Department" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["New York", "San Francisco", "Los Angeles"]}
//             onChange={(e, value) => handleFilterChange("location", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Location" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["Active", "Inactive"]}
//             onChange={(e, value) => handleFilterChange("status", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Status" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["Manager", "Engineer", "Recruiter", "HR Specialist"]}
//             onChange={(e, value) => handleFilterChange("role", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Role" />
//             )}
//           />
//           <TextField
//             label="Filter by Date (After)"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             onChange={(e) => handleFilterChange("date", e.target.value)}
//             fullWidth
//             style={{ marginTop: "20px" }}
//           />
//           <Button
//             variant="outlined"
//             fullWidth
//             style={{ marginTop: "20px" }}
//             onClick={() => setDrawerOpen(false)}
//           >
//             Apply Filters
//           </Button>
//         </Box>
//       </Drawer>
//       <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//         <Table>
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
//             {data.length > 0 ? (
//               data.map((row) => (
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

// export default DepartmentTableWithFilters;

// import React, { useState, useEffect } from "react";
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
//   Button,
//   Drawer,
//   Box,
// } from "@mui/material";
// import axios from "axios";

// function DepartmentTableWithFilters() {
//   const [filters, setFilters] = useState({
//     department: [],
//     location: [],
//     status: [],
//     role: [],
//     date: null,
//   });
//   const [data, setData] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Function to build query parameters
//   const buildQueryParams = () => {
//     const params = new URLSearchParams();
//     Object.keys(filters).forEach((key) => {
//       const value = filters[key];
//       if (Array.isArray(value) && value.length > 0) {
//         params.append(key, value.join(","));
//       } else if (value) {
//         params.append(key, value);
//       }
//     });
//     return params.toString();
//   };

//   // Fetch data from the API with filters
//   const fetchData = async () => {
//     try {
//       const queryParams = buildQueryParams();
//       const response = await axios.get(
//         `http://localhost:7779/departments?${queryParams}`
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Fetch data when filters change
//   useEffect(() => {
//     fetchData();
//   }, [filters]);

//   const handleFilterChange = (filterKey, values) => {
//     setFilters((prev) => ({ ...prev, [filterKey]: values }));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Button variant="contained" onClick={() => setDrawerOpen(true)}>
//         Open Filters
//       </Button>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box p={3} width="300px" role="presentation">
//           <h3>Filters</h3>
//           <Autocomplete
//             multiple
//             options={["HR", "Engineering"]}
//             onChange={(e, value) => handleFilterChange("department", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Department" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["New York", "San Francisco", "Los Angeles"]}
//             onChange={(e, value) => handleFilterChange("location", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Location" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["Active", "Inactive"]}
//             onChange={(e, value) => handleFilterChange("status", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Status" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["Manager", "Engineer", "Recruiter", "HR Specialist"]}
//             onChange={(e, value) => handleFilterChange("role", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Filter by Role" />
//             )}
//           />
//           <TextField
//             label="Filter by Date (After)"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             onChange={(e) => handleFilterChange("date", e.target.value)}
//             fullWidth
//             style={{ marginTop: "20px" }}
//           />
//           <Button
//             variant="outlined"
//             fullWidth
//             style={{ marginTop: "20px" }}
//             onClick={() => setDrawerOpen(false)}
//           >
//             Apply Filters
//           </Button>
//         </Box>
//       </Drawer>
//       <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//         <Table>
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
//             {data.length > 0 ? (
//               data.map((row) => (
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

// export default DepartmentTableWithFilters;

// import React, { useState, useEffect } from "react";
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
//   Button,
//   Drawer,
//   Box,
// } from "@mui/material";
// import axios from "axios";

// function DepartmentTableWithFilters() {
//   const [filters, setFilters] = useState({
//     department: [],
//     location: [],
//     status: [],
//     role: [],
//     date: null,
//   });
//   console.log(filters, "FData");
//   const [data, setData] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Build query string from filters
//   const buildQueryParams = () => {
//     const params = new URLSearchParams();
//     Object.entries(filters).forEach(([key, value]) => {
//       if (Array.isArray(value) && value.length > 0) {
//         params.append(key, value.join(","));
//       } else if (value) {
//         params.append(key, value);
//       }
//     });
//     return params.toString();
//   };

//   // Fetch data from the API with filters
//   const fetchData = async () => {
//     try {
//       const queryString = buildQueryParams();
//       const response = await axios.get(
//         `http://localhost:7779/departments?${queryString}`
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Update data when filters change
//   useEffect(() => {
//     fetchData();
//   }, [filters]);

//   const handleFilterChange = (filterKey, values) => {
//     setFilters((prev) => ({ ...prev, [filterKey]: values }));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Button variant="contained" onClick={() => setDrawerOpen(true)}>
//         Open Filters
//       </Button>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box p={3} width="300px" role="presentation">
//           <h3>Filters</h3>
//           <Autocomplete
//             multiple
//             options={["HR", "Engineering"]}
//             onChange={(e, value) => handleFilterChange("department", value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Department" />
//             )}
//           />
//           <Autocomplete
//             multiple
//             options={["New York", "San Francisco", "Los Angeles"]}
//             onChange={(e, value) => handleFilterChange("location", value)}
//             renderInput={(params) => <TextField {...params} label="Location" />}
//           />
//           <Autocomplete
//             multiple
//             options={["Active", "Inactive"]}
//             onChange={(e, value) => handleFilterChange("status", value)}
//             renderInput={(params) => <TextField {...params} label="Status" />}
//           />
//           <Autocomplete
//             multiple
//             options={["Manager", "Engineer", "Recruiter", "HR Specialist"]}
//             onChange={(e, value) => handleFilterChange("role", value)}
//             renderInput={(params) => <TextField {...params} label="Role" />}
//           />
//           <TextField
//             label="Date (After)"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             onChange={(e) => handleFilterChange("date", e.target.value)}
//             fullWidth
//             style={{ marginTop: "20px" }}
//           />
//           <Button
//             variant="outlined"
//             fullWidth
//             style={{ marginTop: "20px" }}
//             onClick={() => setDrawerOpen(false)}
//           >
//             Apply Filters
//           </Button>
//         </Box>
//       </Drawer>
//       <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//         <Table>
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
//             {data.length > 0 ? (
//               data.map((row) => (
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

// export default DepartmentTableWithFilters;
