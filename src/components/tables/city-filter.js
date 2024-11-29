// import React, { useState } from "react";
// import {
//   FormControl,
//   Box,
//   Popover,
//   Typography,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import ClearIcon from "@mui/icons-material/Clear";

// const CityFilterComponent = ({ handleCitySelect, handleClearSelection }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedCity, setSelectedCity] = useState("");

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleCityClick = (city) => {
//     setSelectedCity(city); // Update selected city
//     handleCitySelect(city); // Call parent function
//     handleClose(); // Close the popover
//   };

//   const handleClear = () => {
//     setSelectedCity(""); // Reset selection
//     handleClearSelection(); // Refresh data
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "city-filter-popover" : undefined;

//   const cities = [
//     "Dallas",
//     "Las Vegas",
//     "San Diego",
//     "San Francisco",
//     "Chicago",
//     "Philadelphia",
//     "Charlotte",
//     "Baltimore",
//     "Long Beach",
//     "St. Louis",
//     "New York",
//     "Los Angeles",
//     "Indianapolis",
//     "Denver",
//     "Tucson",
//     "Vinukonda",
//   ]; // Replace with dynamic data if needed

//   return (
//     <FormControl sx={{ width: "13%" }}>
//       <Box
//         sx={{
//           height: "2.5rem",
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "#e3e4e6",
//           padding: "0 10px",
//           borderRadius: "4px",
//           justifyContent: "space-between",
//           cursor: "pointer",
//         }}
//         onClick={handleOpen}
//       >
//         <Typography color="#888">
//           {selectedCity || "Select City"}
//         </Typography>
//         {selectedCity && (
//           <IconButton
//             size="small"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent opening the popover
//               handleClear();
//             }}
//           >
//             <ClearIcon fontSize="small" />
//           </IconButton>
//         )}
//       </Box>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         <Box sx={{ p: 2, minWidth: "200px" }}>
//           {cities.map((city) => (
//             <React.Fragment key={city}>
//               <Box
//                 sx={{
//                   cursor: "pointer",
//                   padding: "4px",
//                   fontSize: "15px",
//                   "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                   },
//                 }}
//                 onClick={() => handleCityClick(city)}
//               >
//                 {city}
//               </Box>
//               <Divider />
//             </React.Fragment>
//           ))}
//         </Box>
//       </Popover>
//     </FormControl>
//   );
// };
// export default CityFilterComponent;
