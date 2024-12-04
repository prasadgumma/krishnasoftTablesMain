// import React from "react";
// import { TextField } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const CustomDatePicker = ({ value, onChange, label }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         label={label}
//         value={value ? dayjs(value) : null}
//         onChange={(newValue) => {
//           onChange(newValue ? dayjs(newValue).format("YYYY-MM-DD") : null);
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             fullWidth
//             size="small"
//             sx={{
//               "& .MuiInputBase-input": {
//                 color: "#787877",
//                 backgroundColor: "#f9f9f9",
//               },
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#787877",
//               },
//               "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
//                 {
//                   borderColor: "#000",
//                 },
//             }}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };

// export default CustomDatePicker;

import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDatePicker = (props) => {
  const { item, applyValue } = props;

  const handleDateChange = (newValue) => {
    // Format the selected date to YYYY-MM-DD and apply
    applyValue({
      ...item,
      value: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={item.value ? dayjs(item.value, "YYYY-MM-DD") : null}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        inputFormat="YYYY-MM-DD" // Enforces the display format in the input field
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            size="small"
            placeholder="YYYY-MM-DD"
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
