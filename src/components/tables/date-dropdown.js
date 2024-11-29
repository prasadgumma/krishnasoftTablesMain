// import React, { useState } from "react";
// import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
// import DateRangeFilter from "./date-range-filter";

// const DateDropdown = () => {
//   const [selectedValue, setSelectedValue] = useState(""); // Keeps track of the selected dropdown option
//   const [filter, setFilter] = useState({
//     fromDate: "",
//     toDate: "",
//   });

//   const handleChange = (event) => {
//     const value = event.target.value;
//     setSelectedValue(value); // Update selected dropdown value
//   };

//   return (
//     <Box sx={{ minWidth: 150, mt: 2 }}>
//       <FormControl fullWidth size="small" disabled>
//         <InputLabel id="dropdown-label" sx={{ color: "#787877" }}>
//           Select Action
//         </InputLabel>
//         <Select
//           labelId="dropdown-label"
//           value={selectedValue}
//           onChange={handleChange}
//           sx={{
//             height: "2.3rem",
//             color: "#787877",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#787877",
//             },
//             "& .MuiSvgIcon-root": {
//               color: "#787877",
//             },
//           }}
//           label="Select Action"
//         >
//           {/* Dropdown option to trigger DateRangeFilter */}
//           <MenuItem value="Show Date Range Filter">
//             Show Date Range Filter
//           </MenuItem>
//         </Select>
//       </FormControl>

//       {/* Conditionally render DateRangeFilter if the value is selected */}
//       {selectedValue === "Show Date Range Filter" && (
//         <Box sx={{ marginTop: 2 }}>
//           <DateRangeFilter filter={filter} setFilter={setFilter} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default DateDropdown;
