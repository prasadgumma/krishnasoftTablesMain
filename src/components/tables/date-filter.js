// import React, { useState } from "react";
// import {
//   FormControl,
//   InputLabel,
//   Box,
//   Popover,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// const DateFilterPopover = ({ filter, setFilter }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [datePickerOption, setDatePickerOption] = useState(null); // Track which option is active
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Track DatePicker visibility

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setDatePickerOption(null);
//     setIsDatePickerOpen(false); // Close DatePicker
//   };

//   const handleMenuItemClick = (value) => {
//     if (value === "today") {
//       setFilter((prev) => ({
//         ...prev,
//         dateOption: "today",
//         exactDate: dayjs(), // Set today's date
//       }));
//       handleClose();
//     } else {
//       setDatePickerOption(value);
//       setIsDatePickerOpen(true); // Automatically open DatePicker
//     }
//   };

//   const handleDateChange = (newValue) => {
//     if (datePickerOption === "exactDate") {
//       setFilter((prev) => ({
//         ...prev,
//         dateOption: "exactDate",
//         exactDate: newValue,
//       }));
//     } else if (datePickerOption === "beforeDate") {
//       setFilter((prev) => ({
//         ...prev,
//         dateOption: "beforeDate",
//         fromDate: newValue,
//       }));
//     } else if (datePickerOption === "afterDate") {
//       setFilter((prev) => ({
//         ...prev,
//         dateOption: "afterDate",
//         toDate: newValue,
//       }));
//     }
//     handleClose();
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "date-filter-popover" : undefined;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <FormControl sx={{ width: "45%" }}>
//         <Box
//           sx={{
//             height: "3rem",
//             display: "flex",
//             alignItems: "center",
//             backgroundColor: "#e3e4e6",
//             padding: "0 10px",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//           onClick={handleOpen}
//         >
//           <Typography color={filter.dateOption ? "inherit" : "#888"}>
//             Select Date Filter
//           </Typography>
//         </Box>
//         <Popover
//           id={id}
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "left",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "left",
//           }}
//         >
//           <Box sx={{ p: 2, minWidth: "200px" }}>
//             {!isDatePickerOpen && (
//               <>
//                 <MenuItem onClick={() => handleMenuItemClick("today")}>
//                   Today
//                 </MenuItem>
//                 <MenuItem onClick={() => handleMenuItemClick("exactDate")}>
//                   Exact Date
//                 </MenuItem>
//                 <MenuItem onClick={() => handleMenuItemClick("beforeDate")}>
//                   Before Date
//                 </MenuItem>
//                 <MenuItem onClick={() => handleMenuItemClick("afterDate")}>
//                   After Date
//                 </MenuItem>
//               </>
//             )}
//             {isDatePickerOpen && (
//               <DatePicker
//                 inline
//                 open
//                 label={
//                   datePickerOption === "exactDate"
//                     ? "Select Exact Date"
//                     : datePickerOption === "beforeDate"
//                     ? "Select Before Date"
//                     : "Select After Date"
//                 }
//                 value={
//                   datePickerOption === "exactDate"
//                     ? filter.exactDate
//                     : datePickerOption === "beforeDate"
//                     ? filter.fromDate
//                     : filter.toDate
//                 }
//                 onChange={handleDateChange}
//                 onClose={handleClose} // Close DatePicker when done
//                 renderInput={(params) => (
//                   <Box sx={{ display: "none" }}>{params.input}</Box>
//                 )} // Hide input field
//               />
//             )}
//           </Box>
//         </Popover>
//       </FormControl>
//     </LocalizationProvider>
//   );
// };

// export default DateFilterPopover;
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Box,
  Popover,
  MenuItem,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DateFilterPopover = ({ filter, setFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [datePickerOption, setDatePickerOption] = useState(null); // Track which option is active
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Track DatePicker visibility

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDatePickerOption(null);
    setIsDatePickerOpen(false); // Close DatePicker
  };

  const handleMenuItemClick = (value) => {
    if (value === "today") {
      setFilter((prev) => ({
        ...prev,
        dateOption: "today",
        exactDate: dayjs(), // Set today's date
      }));
      handleClose();
    } else {
      setDatePickerOption(value);
      setIsDatePickerOpen(true); // Automatically open DatePicker
    }
  };

  const handleDateChange = (newValue) => {
    if (newValue && newValue.isValid()) {
      if (datePickerOption === "exactDate") {
        setFilter((prev) => ({
          ...prev,
          dateOption: "exactDate",
          exactDate: newValue,
        }));
      } else if (datePickerOption === "beforeDate") {
        setFilter((prev) => ({
          ...prev,
          dateOption: "beforeDate",
          fromDate: newValue,
        }));
      } else if (datePickerOption === "afterDate") {
        setFilter((prev) => ({
          ...prev,
          dateOption: "afterDate",
          toDate: newValue,
        }));
      }
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-filter-popover" : undefined;

  // Get the valid date value for DatePicker
  const getValidDate = (option) => {
    const value =
      option === "exactDate"
        ? filter.exactDate
        : option === "beforeDate"
        ? filter.fromDate
        : filter.toDate;

    // Ensure the value passed is a valid dayjs object
    return value && dayjs(value).isValid() ? dayjs(value) : dayjs();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl sx={{ width: "45%" }}>
        <Box
          sx={{
            height: "3rem",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e3e4e6",
            padding: "0 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          <Typography color={filter.dateOption ? "inherit" : "#888"}>
            Select Date Filter
          </Typography>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2, minWidth: "200px" }}>
            {!isDatePickerOpen && (
              <>
                <MenuItem onClick={() => handleMenuItemClick("today")}>
                  Today
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("exactDate")}>
                  Exact Date
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("beforeDate")}>
                  Before Date
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("afterDate")}>
                  After Date
                </MenuItem>
              </>
            )}
            {isDatePickerOpen && (
              <DatePicker
                inline
                open
                label={
                  datePickerOption === "exactDate"
                    ? "Select Exact Date"
                    : datePickerOption === "beforeDate"
                    ? "Select Before Date"
                    : "Select After Date"
                }
                value={getValidDate(datePickerOption)}
                onChange={handleDateChange}
                onClose={handleClose} // Close DatePicker when done
                renderInput={(params) => (
                  <Box sx={{ display: "none" }}>{params.input}</Box>
                )} // Hide input field
              />
            )}
          </Box>
        </Popover>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateFilterPopover;
