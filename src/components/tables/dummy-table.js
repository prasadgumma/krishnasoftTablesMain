// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Box,
//   Grid,
//   Card,
//   IconButton,
//   Checkbox,
//   Drawer,
//   TextField,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
//   InputAdornment,
// } from "@mui/material";
// import { Edit, Delete, Visibility } from "@mui/icons-material"; // Import icons
// import TableDropdown from "./table-dropdown";
// import { DataGrid, GridSearchIcon, useGridApiRef } from "@mui/x-data-grid";
// import DateRangeFilter from "./date-range-filter";
// import CreatedAtColumn from "./created-at-table";
// import { v4 as uuidv4 } from "uuid";
// import dayjs from "dayjs";
// import DateFilterPopover from "./date-filter";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// const MembersTable = () => {
//   const [data, setData] = useState([]);

//   const [sortModel, setSortModel] = useState([{ field: "", sort: "" }]);
//   const [selectedRows, setSelectedRows] = useState([]); // Track selected rows for the current page
//   const [checkedBox, setCheckedBox] = useState(true); // Select All checkbox state
//   const [globalSelectedRows, setGlobalSelectedRows] = useState([]); // Track global selected rows across pages

//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 25,
//   });

//   const apiRef = useGridApiRef();

//   const [filter, setFilter] = useState({
//     fromDate: "",
//     toDate: "",
//   }); // State for date range filter
//   const [openDrawer, setOpenDrawer] = useState(false);

//   const [selectedColumns] = useState({
//     id: true,
//     sNo: true,
//     member: true,
//     age: true,
//     education: true,
//     fatherName: false,
//     motherName: false,
//     husbandName: false,
//     city: true,
//     profession: true,
//     description: false,
//     status: true,
//     action: true,
//   });

//   const [filterModel, setFilterModel] = useState({
//     items: [],
//   });

//   const [customFilters, setCustomFilters] = useState({
//     member: "",
//     age: "",
//     ageCondition: "=", // Default condition
//     filterCondition: "all", // 'all' for AND, 'any' for OR
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   const columns = [
//     { field: "id", headerName: "ID", width: 70, hide: !selectedColumns.id },
//     {
//       field: "member",
//       headerName: "Member",
//       filterable: true,
//       width: 150,
//       hide: !selectedColumns.member,
//     },
//     CreatedAtColumn({ field: "createdAt" }),
//     {
//       field: "age",
//       type: "number",
//       headerName: "Age",
//       width: 90,
//       hide: !selectedColumns.age,
//       sortable: true,
//     },
//     {
//       field: "education",
//       headerName: "Education",
//       width: 130,
//       hide: !selectedColumns.education,
//     },
//     {
//       field: "fatherName",
//       headerName: "Father's Name",
//       width: 150,
//       hide: !selectedColumns.fatherName,
//     },
//     {
//       field: "motherName",
//       headerName: "Mother's Name",
//       width: 150,
//       hide: !selectedColumns.motherName,
//     },
//     {
//       field: "husbandName",
//       headerName: "Husband's Name",
//       width: 150,
//       hide: !selectedColumns.husbandName,
//     },
//     {
//       field: "city",
//       headerName: "City",
//       width: 100,
//       hide: !selectedColumns.city,
//     },
//     {
//       field: "profession",
//       headerName: "Profession",
//       width: 130,
//       hide: !selectedColumns.profession,
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       width: 200,
//       hide: !selectedColumns.description,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 100,
//       hide: !selectedColumns.status,
//       renderCell: (params) => (params.row.isEnabled ? "Enabled" : "Disabled"),
//     },
//     {
//       field: "action",
//       headerName: "Actions",
//       width: 150,
//       hide: !selectedColumns.action,
//       renderCell: (params) => (
//         <Box>
//           <IconButton
//             component={Link}
//             to={`/table/edit/member/${params.row.id}`}
//             color="primary"
//             sx={{ mr: 1 }}
//           >
//             <Edit />
//           </IconButton>
//           <IconButton color="error" onClick={() => deleteHandle(params.row.id)}>
//             <Delete />
//           </IconButton>
//           <IconButton
//             component={Link}
//             to={`/table/view/member/${params.row.id}`} // View Member route
//             color="success" // Use a different color to distinguish it
//             sx={{ mr: 1 }}
//           >
//             <Visibility />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const { page, pageSize } = paginationModel;
//         const response = await axios.get("http://localhost:7779/members", {
//           params: {
//             _page: page + 1,
//             _limit: pageSize,
//             _search: searchQuery,
//           },
//         });

//         const dataWithCreatedAt = response.data.map((member) => {
//           const existingCreatedAt =
//             member.createdAt || localStorage.getItem(`createdAt_${member.id}`);
//           const createdAt = existingCreatedAt || new Date().toISOString();

//           if (!existingCreatedAt) {
//             localStorage.setItem(`createdAt_${member.id}`, createdAt);
//           }

//           return { ...member, createdAt };
//         });

//         setData(dataWithCreatedAt);

//         // Check if all filtered rows are selected
//         const allIds = data.map((row) => row.id);
//         const allSelected =
//           allIds.length > 0 &&
//           allIds.every((id) => globalSelectedRows.includes(id));
//         setCheckedBox(allSelected);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     };

//     fetchMembers();
//   }, [paginationModel, searchQuery, globalSelectedRows]); // Add globalSelectedRows as a dependency

//   const deleteHandle = (id) => {
//     if (window.confirm("Would you like to delete this row?")) {
//       axios.delete(`http://localhost:7779/members/${id}`).then(() => {
//         setData((prevData) => prevData.filter((member) => member.id !== id));
//       });
//     }
//   };

//   const filteredData = data.filter((row) => {
//     const { fromDate, toDate, dateOption, exactDate } = filter;
//     const { member, age, ageCondition, filterCondition } = customFilters;

//     // Normalize createdAt for date filters
//     const createdAtDate = dayjs(row.createdAt);
//     const today = dayjs();

//     const normalizeDate = (date) => {
//       const d = dayjs(date).startOf("day");
//       return d;
//     };

//     // Handle date filters based on dateOption
//     let passesDateFilter = true;

//     switch (dateOption) {
//       case "today":
//         passesDateFilter = createdAtDate.isSame(today, "day");
//         break;
//       case "exactDate":
//         passesDateFilter = exactDate
//           ? createdAtDate.isSame(normalizeDate(exactDate), "day")
//           : true;
//         break;
//       case "beforeDate":
//         passesDateFilter = fromDate
//           ? createdAtDate.isBefore(normalizeDate(fromDate), "day")
//           : true;
//         break;
//       case "afterDate":
//         passesDateFilter = toDate
//           ? createdAtDate.isAfter(normalizeDate(toDate), "day")
//           : true;
//         break;
//       default:
//         if (fromDate && toDate) {
//           passesDateFilter =
//             createdAtDate >= normalizeDate(fromDate) &&
//             createdAtDate <= normalizeDate(toDate);
//         } else if (fromDate) {
//           passesDateFilter = createdAtDate >= normalizeDate(fromDate);
//         } else if (toDate) {
//           passesDateFilter = createdAtDate <= normalizeDate(toDate);
//         }
//     }

//     // Check member filter
//     const matchesMember = member
//       ? row.member.toLowerCase().includes(member.toLowerCase())
//       : true;

//     // Apply age condition
//     const ageValue = parseInt(age, 10);
//     let matchesAge = true;
//     if (age && !isNaN(ageValue)) {
//       switch (ageCondition) {
//         case "<":
//           matchesAge = row.age < ageValue;
//           break;
//         case ">":
//           matchesAge = row.age > ageValue;
//           break;
//         case "<=":
//           matchesAge = row.age <= ageValue;
//           break;
//         case ">=":
//           matchesAge = row.age >= ageValue;
//           break;
//         case "=":
//           matchesAge = row.age === ageValue;
//           break;
//         case "!=":
//           matchesAge = row.age !== ageValue;
//           break;
//         default:
//           matchesAge = true; // Default to match all if no condition selected
//       }
//     }

//     // Apply AND or OR logic based on filterCondition
//     const passesCustomFilter =
//       filterCondition === "all"
//         ? matchesMember && matchesAge // AND condition
//         : matchesMember || matchesAge; // OR condition

//     // Combine both date and custom filters
//     return passesDateFilter && passesCustomFilter;
//   });

//   const handlePaginationChange = (newPaginationModel) => {
//     setPaginationModel(newPaginationModel);
//   };

//   // Export to CSV function
//   const exportToCSV = () => {
//     const headers =
//       columns
//         .filter((col) => !col.hide)
//         .map((col) => col.headerName)
//         .join(",") + "\n";

//     const rows = data
//       .map((row) =>
//         columns
//           .filter((col) => !col.hide)
//           .map((col) => row[col.field] || "")
//           .join(",")
//       )
//       .join("\n");

//     const csvContent = headers + rows;

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     if (link.download !== undefined) {
//       const url = URL.createObjectURL(blob);
//       link.setAttribute("href", url);
//       link.setAttribute("download", "members_list.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const handleSelectionChange = (newSelection) => {
//     // Update selected rows for the current page
//     setSelectedRows(newSelection);

//     // Determine if "Select All" should be checked (select all rows on the current page)
//     const allIds = filteredData.map((row) => row.id);
//     setCheckedBox(newSelection.length === allIds.length);

//     // Update global selection (combine with previous selection)
//     setGlobalSelectedRows((prev) => {
//       const updatedGlobalSelection = Array.from(
//         new Set([...prev, ...newSelection])
//       );
//       return updatedGlobalSelection;
//     });
//   };

//   const handleSelection = (eventOrIds) => {
//     if (typeof eventOrIds === "object" && eventOrIds.target) {
//       // Handle "Select All" checkbox change
//       const { checked } = eventOrIds.target;
//       setCheckedBox(checked);

//       const allIds = filteredData.map((row) => row.id);
//       if (checked) {
//         // Select all rows across the filtered data
//         setGlobalSelectedRows((prev) =>
//           Array.from(new Set([...prev, ...allIds]))
//         );
//         setSelectedRows(allIds); // Select all rows on the current page
//       } else {
//         // Deselect all rows
//         setGlobalSelectedRows(
//           (prev) => prev.filter((id) => !allIds.includes(id)) // Remove filtered rows from global selection
//         );
//         setCheckedBox([]); // Reset local selection for the current page
//       }
//     } else {
//       // When individual row(s) are selected/deselected
//       const selectedIds = eventOrIds; // Array of selected row IDs
//       setSelectedRows(selectedIds); // Update selected rows for the current page

//       const allIds = filteredData.map((row) => row.id); // Get all IDs for the filtered rows
//       setCheckedBox(selectedIds.length === allIds.length); // Check if all filtered rows are selected

//       // Update global selection
//       setGlobalSelectedRows((prev) => {
//         const updatedGlobalSelection = Array.from(
//           new Set([...prev, ...selectedIds])
//         );
//         return updatedGlobalSelection;
//       });
//     }
//   };

//   const handleApplyClick = () => {
//     if (selectedRows.length > 0) {
//       alert(`Selected row IDs: ${selectedRows.join(", ")}`);
//     } else {
//       alert("No rows selected.");
//     }
//   };

//   const toggleDrawer = () => {
//     setOpenDrawer(!openDrawer);
//   };

//   const handleFilterChangeDate = (newFilterModel) => {
//     setFilterModel(newFilterModel); // Update filter model
//   };

//   const showThebottomButtons = selectedRows.length > 0;

//   return (
//     <LocalizationProvider>
//       <Box pb={2}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card sx={{ height: "100%" }}>
//               <Box
//                 mx={2}
//                 mt={2}
//                 py={1}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <Typography
//                   variant="h5"
//                   color="#787879"
//                   align="left"
//                   fontFamily={"serif"}
//                   mb={1}
//                 >
//                   Members Table
//                 </Typography>
//                 <Box>
//                   <TextField
//                     variant="filled"
//                     placeholder="Search..."
//                     size="small"
//                     value={customFilters.member}
//                     onChange={(e) =>
//                       setCustomFilters((prev) => ({
//                         ...prev,
//                         member: e.target.value,
//                       }))
//                     }
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <GridSearchIcon />
//                         </InputAdornment>
//                       ),
//                     }}
//                     style={{ width: "300px" }}
//                   />
//                 </Box>
//               </Box>
//               <Box p={2}>
//                 <Grid
//                   container
//                   spacing={2}
//                   alignItems="right" // Vertically center the items
//                 >
//                   <Grid
//                     container
//                     spacing={2}
//                     alignItems="center" // Vertically center the items
//                     justifyContent="space-between" // This will push items to the left and right
//                   >
//                     {/* DateRangeFilter Section (Left) */}
//                     <Grid item xs={4} sx={{ ml: "25px", m: "20px" }}>
//                       {/* <DateRangeFilter filter={filter} setFilter={setFilter} /> */}
//                       <DateFilterPopover
//                         filter={filter}
//                         setFilter={setFilter}
//                       />
//                     </Grid>
//                     {/* <Box> */}
//                     <Grid item xs={4} sx={{ ml: "25px", m: "10px" }}>
//                       <TextField
//                         label="Search"
//                         variant="outlined"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
//                         sx={{ marginBottom: 2 }} // Optional styling
//                       />
//                     </Grid>
//                     {/* </Box> */}

//                     {/* Buttons and DateDropdown Section (Right) */}
//                     <Grid item>
//                       <Box display="flex" alignItems="center" gap={2} m={1.5}>
//                         <Button
//                           variant="outlined"
//                           color="#787879"
//                           onClick={exportToCSV}
//                         >
//                           Export to CSV
//                         </Button>

//                         <Button
//                           variant="outlined"
//                           color="#787879"
//                           onClick={toggleDrawer}
//                         >
//                           My Filters
//                         </Button>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 </Grid>

//                 <DataGrid
//                   rows={filteredData}
//                   columns={columns}
//                   checkboxSelection
//                   disableSelectionOnClick={true}
//                   rowSelectionModel={globalSelectedRows}
//                   // onRowSelectionModelChange={handleSelection}
//                   onRowSelectionModelChange={handleSelectionChange}
//                   pagination
//                   pageSize={paginationModel.pageSize}
//                   page={paginationModel.page}
//                   initialState={{
//                     pagination: {
//                       paginationModel: { page: 0, pageSize: 5 },
//                     },
//                   }}
//                   pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
//                   rowCount={300} // Make sure this reflects the total number of members
//                   paginationMode="server"
//                   onPaginationModelChange={handlePaginationChange}
//                   filterModel={filterModel}
//                   onFilterModelChange={handleFilterChangeDate}
//                   sx={{
//                     height: 600, // Set a fixed height
//                     width: "100%",
//                     // overflowY: "auto", // Enable vertical scrolling
//                     "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
//                       color: "white",
//                     },
//                     "& .MuiDataGrid-columnHeader": {
//                       backgroundColor: "#787877",
//                       color: "white",
//                       maxHeight: 70,
//                     },
//                     "& .MuiDataGrid-columnHeaderTitle": {
//                       color: "white",
//                     },
//                     "& .MuiDataGrid-columnMenuIcon": {
//                       color: "#fffff !important",
//                     },
//                     "& .MuiDataGrid-menu": {
//                       backgroundColor: "#1976d2",
//                     },
//                     "& .MuiMenuItem-root": {
//                       color: "white",
//                     },
//                     "& .MuiDataGrid-menuItem-root:hover": {
//                       backgroundColor: "#1565c0",
//                     },
//                     "& .MuiDataGrid-sortIcon": {
//                       opacity: 1,
//                       color: "white",
//                     },
//                     "& .MuiDataGrid-menuIconButton": {
//                       opacity: 1,
//                       color: "white",
//                     },
//                     "& .MuiDataGrid-filterIcon": {
//                       opacity: 1,
//                       color: "white",
//                     },
//                   }}
//                 />
//               </Box>

//               {showThebottomButtons && (
//                 <Box
//                   key={uuidv4()}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "start",
//                     m: 2,
//                     position: "fixed",
//                     bottom: 10,
//                     width: "83%",
//                     backgroundColor: "#787877",
//                     gap: 2,
//                     zIndex: 5,
//                     p: 0.5,
//                     mr: "530px",
//                     borderRadius: "7px", // Set the border radius here
//                     boxShadow: 3, // Optional: add shadow for better visibility
//                   }}
//                 >
//                   <Button
//                     variant="outlined"
//                     color="white"
//                     onClick={handleApplyClick}
//                     sx={{ maxHeight: 35, mt: 1.2, color: "#ffff", ml: 2 }}
//                   >
//                     Apply
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="white"
//                     sx={{ maxHeight: 35, mt: 1.2, color: "#ffff" }}
//                     onClick={() => setSelectedRows([])} // Reset selection on cancel
//                   >
//                     Cancel
//                   </Button>
//                   <Box mb={0.5}>
//                     <TableDropdown />
//                   </Box>

//                   <Box display={"flex"} mt={1} mb={1}>
//                     <Checkbox
//                       checked={checkedBox}
//                       onChange={handleSelection} // Handle checkbox change
//                       value="checkedBox"
//                       sx={{
//                         color: "white",
//                         "&.Mui-checked": {
//                           color: "white",
//                         },
//                       }}
//                     />
//                     <Typography variant="h6" color="#ffff" sx={{ mt: 0.7 }}>
//                       For All
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Drawer Component */}
//         <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
//           <Box p={2} width="500px">
//             <Typography variant="h6" color="textPrimary">
//               My Filters
//             </Typography>
//             <Box textAlign={"center"}>
//               <FormControl sx={{ width: "50%" }} margin="normal">
//                 <InputLabel>Filter Condition</InputLabel>
//                 <Select
//                   value={customFilters.filterCondition}
//                   onChange={(e) => {
//                     const filterCondition = e.target.value;
//                     setCustomFilters((prev) => ({
//                       ...prev,
//                       filterCondition,
//                     }));
//                   }}
//                 >
//                   <MenuItem value="all">All (AND)</MenuItem>
//                   <MenuItem value="any">Any (OR)</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//             <TextField
//               label="Member"
//               fullWidth
//               name="member"
//               value={customFilters.member}
//               onChange={(e) =>
//                 setCustomFilters((prev) => ({
//                   ...prev,
//                   member: e.target.value,
//                 }))
//               }
//               margin="normal"
//             />
//             <Box mt={2}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth sx={{ mt: 2 }}>
//                     <InputLabel>Age Condition</InputLabel>
//                     <Select
//                       value={customFilters.ageCondition}
//                       onChange={(e) =>
//                         setCustomFilters((prev) => ({
//                           ...prev,
//                           ageCondition: e.target.value,
//                         }))
//                       }
//                     >
//                       <MenuItem value="=">=</MenuItem>
//                       <MenuItem value="!=">!=</MenuItem>
//                       <MenuItem value="<">&lt;</MenuItem>
//                       <MenuItem value=">">&gt;</MenuItem>
//                       <MenuItem value="<=">&lt;=</MenuItem>
//                       <MenuItem value=">=">&gt;=</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <TextField
//                     label="Age"
//                     fullWidth
//                     name="age"
//                     value={customFilters.age}
//                     onChange={(e) =>
//                       setCustomFilters((prev) => ({
//                         ...prev,
//                         age: e.target.value,
//                       }))
//                     }
//                     margin="normal"
//                   />
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>

//           <Box m={2}>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={() =>
//                 setCustomFilters({
//                   member: "",
//                   age: "",
//                   filterCondition: "all",
//                 })
//               }
//             >
//               Reset Filters
//             </Button>
//           </Box>
//           <Box m={2}>
//             <Typography m={2}>Date Filters</Typography>
//             <DateRangeFilter filter={filter} setFilter={setFilter} />
//           </Box>
//         </Drawer>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default MembersTable;

import React from "react";
import FilterableTable from "./test";

function App() {
  return (
    <div>
      <h1>Filterable Table</h1>
      <FilterableTable />
    </div>
  );
}

export default App;
