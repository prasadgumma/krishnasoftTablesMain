import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateRangeFilter = ({ dateFilter, setDateFilter }) => {
  // Handle From Date change
  console.log(dayjs(dateFilter.fromDate));
  console.log(dateFilter.fromDate);
  const handleFromDateChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).format("DD-MM-YYYY")
      : null;
    console.log(formattedDate, "Date");
    setDateFilter((prev) => ({ ...prev, fromDate: formattedDate }));
  };

  // Handle To Date change
  const handleToDateChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).format("DD-MM-YYYY")
      : null;
    console.log(newValue?.toISOString(), "New Value");
    setDateFilter((prev) => ({ ...prev, toDate: formattedDate }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box mb={2}>
        <Typography gutterBottom mb={2}>
          Date Filters
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* From Date Picker */}
          <DatePicker
            label="From Date"
            value={
              dateFilter.fromDate
                ? dayjs(dateFilter.fromDate, "DD-MM-YYYY")
                : null
            } // Parse ISO string
            format="DD-MM-YYYY"
            onChange={handleFromDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#787877",
                    backgroundColor: "#f9f9f9",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#787877",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#000",
                    },
                }}
              />
            )}
          />

          {/* To Date Picker */}
          <DatePicker
            label="To Date"
            value={
              dateFilter.toDate ? dayjs(dateFilter.toDate, "DD-MM-YYYY") : null
            } // Parse ISO string
            format="DD-MM-YYYY"
            onChange={handleToDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#787877",
                    backgroundColor: "#f9f9f9",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#787877",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#000",
                    },
                }}
              />
            )}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;
