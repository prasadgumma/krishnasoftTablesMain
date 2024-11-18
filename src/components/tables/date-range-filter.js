import React from "react";
import { TextField, Box } from "@mui/material";

const DateRangeFilter = ({ filter, setFilter }) => {
  const handleFromDateChange = (e) => {
    setFilter({ ...filter, fromDate: e.target.value });
  };

  const handleToDateChange = (e) => {
    setFilter({ ...filter, toDate: e.target.value });
  };

  return (
    <Box mb={2} sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
      <TextField
        label="From Date"
        type="date"
        InputLabelProps={{
          shrink: true, // Ensures the label stays above the input field
        }}
        value={filter.fromDate}
        onChange={handleFromDateChange}
        sx={{
          width: "80%",
          height: "35px",
          "& .MuiInputBase-root": {
            height: "35px",
          },
          "& .MuiInputLabel-root": {
            color: "#787877", // Custom label color
          },
          "& .MuiInputBase-input": {
            color: "#787877",
            backgroundColor: "#f0f0f0", // Custom background color
            height: "10px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#787877", // Custom border color
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3473e0", // Border color on hover
          },
        }}
      />

      <TextField
        label="To Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={filter.toDate}
        onChange={handleToDateChange}
        sx={{
          width: "80%",
          height: "40px",
          "& .MuiInputBase-root": {
            height: "35px",
          },
          "& .MuiInputLabel-root": {
            color: "#787877", // Custom label color
          },
          "& .MuiInputBase-input": {
            color: "#787877",
            backgroundColor: "#f0f0f0", // Custom background color
            height: "10px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#787877", // Custom border color
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3473e0 ", // Border color on hover
          },
        }}
      />
    </Box>
  );
};

export default DateRangeFilter;

// import React from "react";
// import { Box, TextField } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// const DateRangeFilter = ({ filter, setFilter }) => {
//   const handleFromDateChange = (newDate) => {
//     setFilter({ ...filter, fromDate: newDate });
//   };

//   const handleToDateChange = (newDate) => {
//     setFilter({ ...filter, toDate: newDate });
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box mb={2} sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
//         <DatePicker
//           label="From Date"
//           value={filter.fromDate}
//           onChange={handleFromDateChange}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               sx={{
//                 width: "20%", // Adjust the width
//                 height: "40px", // Adjust the height
//                 "& .MuiInputBase-root": {
//                   height: "40px", // Set the input field's height
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: "#787877", // Custom label color
//                 },
//                 "& .MuiInputBase-input": {
//                   color: "#787877", // Custom text color for the input value
//                   backgroundColor: "#f0f0f0", // Custom background color for input
//                 },
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#787877", // Custom border color
//                 },
//                 "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
//                   {
//                     borderColor: "#3473e0", // Border color when focused or hovered
//                   },
//               }}
//             />
//           )}
//         />

//         <DatePicker
//           label="To Date"
//           value={filter.toDate}
//           onChange={handleToDateChange}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               sx={{
//                 width: "20%", // Adjust the width
//                 height: "40px", // Adjust the height
//                 "& .MuiInputBase-root": {
//                   height: "40px", // Set the input field's height
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: "#787877", // Custom label color
//                 },
//                 "& .MuiInputBase-input": {
//                   color: "#787877", // Custom text color for the input value
//                   backgroundColor: "#f0f0f0", // Custom background color for input
//                 },
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#787877", // Custom border color
//                 },
//                 "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
//                   {
//                     borderColor: "#3473e0", // Border color when focused or hovered
//                   },
//               }}
//             />
//           )}
//         />
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default DateRangeFilter;

// import React from "react";
// import { TextField, Box } from "@mui/material";
// import { format, parseISO } from "date-fns"; // Importing date-fns for date formatting

// const DateRangeFilter = ({ filter, setFilter }) => {
//   // Format the date to MM/DD/YYYY for display in the TextField
//   const formattedFromDate = filter.fromDate
//     ? format(new Date(filter.fromDate), "MM/dd/yyyy")
//     : "";
//   const formattedToDate = filter.toDate
//     ? format(new Date(filter.toDate), "MM/dd/yyyy")
//     : "";

//   const handleFromDateChange = (e) => {
//     const formattedDate = e.target.value;
//     // Parse the date back to ISO format (YYYY-MM-DD) when storing
//     const parsedDate = parseISO(formattedDate); // Convert to Date object in ISO format
//     setFilter({ ...filter, fromDate: parsedDate });
//   };

//   const handleToDateChange = (e) => {
//     const formattedDate = e.target.value;
//     // Parse the date back to ISO format (YYYY-MM-DD) when storing
//     const parsedDate = parseISO(formattedDate); // Convert to Date object in ISO format
//     setFilter({ ...filter, toDate: parsedDate });
//   };

//   return (
//     <Box mb={2} sx={{ display: "flex", justifyContent: "start", gap: 2 }}>
//       <TextField
//         label="From Date"
//         type="date"
//         InputLabelProps={{
//           shrink: true, // Ensures the label is above the field when a value is present
//         }}
//         value={formattedFromDate} // Use formatted date here
//         onChange={handleFromDateChange}
//         sx={{
//           width: "80%", // Adjust the width
//           height: "40px", // Adjust the height (specifically)
//           "& .MuiInputBase-root": {
//             height: "40px", // Set the input field's height
//           },
//           "& .MuiInputLabel-root": {
//             color: "#787877", // Custom label color
//           },
//           "& .MuiInputBase-input": {
//             color: "#787877", // Custom text color for the input value
//             backgroundColor: "#f0f0f0", // Custom background color for input
//           },
//           "& .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#787877", // Custom border color
//           },
//           "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#3473e0", // Border color when focused or hovered
//           },
//         }}
//       />

//       <TextField
//         label="To Date"
//         type="date"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         value={formattedToDate} // Use formatted date here
//         onChange={handleToDateChange}
//         sx={{
//           width: "80%", // Adjust the width
//           height: "40px", // Adjust the height (specifically)
//           "& .MuiInputBase-root": {
//             height: "40px", // Set the input field's height
//           },
//           "& .MuiInputLabel-root": {
//             color: "#787877", // Custom label color
//           },
//           "& .MuiInputBase-input": {
//             color: "#787877", // Custom text color for the input value
//             backgroundColor: "#f0f0f0", // Custom background color for input
//           },
//           "& .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#787877", // Custom border color
//           },
//           "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#3473e0", // Border color when focused or hovered
//           },
//         }}
//       />
//     </Box>
//   );
// };

// export default DateRangeFilter;
