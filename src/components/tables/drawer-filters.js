// import React, { useState } from "react";
// import {
//   Box,
//   Drawer,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
// } from "@mui/material";

// const DrawerFilters = () => {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [dummyFilters, setDummyFilters] = useState({
//     filter1: "",
//     filter2: "",
//     filter3: "",
//   });
//   const [filterOption, setFilterOption] = useState("all"); // Track "All" or "Any" option

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setDummyFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   // Handle selection of "All" or "Any" option
//   const handleOptionChange = (event) => {
//     setFilterOption(event.target.value);
//   };

//   const toggleDrawer = () => {
//     setOpenDrawer(!openDrawer);
//   };

//   return (
//     <div>
//       {/* Button to open the Drawer */}
//       <Button variant="outlined" color="primary" onClick={toggleDrawer}>
//         Add Filters
//       </Button>

//       {/* Drawer Component */}
//       <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
//         <Box p={2} width="500px">
//           <Typography variant="h6" color="textPrimary">
//             My Filters
//           </Typography>

//           {/* Filter Option Selector */}
//           <FormControl fullWidth margin="normal">
//             {/* <InputLabel>Filter Condition</InputLabel> */}
//             <Select
//               value={filterOption}
//               onChange={handleOptionChange}
//               label="Filter Condition"
//             >
//               <MenuItem value="all">All</MenuItem>
//               <MenuItem value="any">Any</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Filter 1 */}
//           <TextField
//             label="Filter 1"
//             fullWidth
//             name="filter1"
//             value={dummyFilters.filter1}
//             onChange={handleFilterChange}
//             margin="normal"
//           />

//           {/* "All" or "Any" Text between the filters */}
//           <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
//             {filterOption === "all" ? "AND" : "OR"}
//           </Typography>

//           {/* Filter 2 */}
//           <TextField
//             label="Filter 2"
//             fullWidth
//             name="filter2"
//             value={dummyFilters.filter2}
//             onChange={handleFilterChange}
//             margin="normal"
//           />

//           {/* Close Drawer Button */}
//           <Box mt={2}>
//             <Button variant="outlined" color="secondary" onClick={toggleDrawer}>
//               Close Filters
//             </Button>
//           </Box>
//         </Box>
//       </Drawer>
//     </div>
//   );
// };

// export default DrawerFilters;
