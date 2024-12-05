import React, { useEffect, useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateRangeFilter = ({ dateFilter, setDateFilter }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Update states when dateFilter changes
  useEffect(() => {
    setFromDate(
      dateFilter.fromDate ? dayjs(dateFilter.fromDate, "DD-MM-YYYY") : null
    );
    setToDate(
      dateFilter.toDate ? dayjs(dateFilter.toDate, "DD-MM-YYYY") : null
    );
  }, [dateFilter]);

  console.log(dateFilter, "DateFiler");

  // Handle From Date change
  const handleFromDateChange = (newValue) => {
    const formattedDate = newValue ? newValue.format("DD-MM-YYYY") : null;
    setDateFilter((prev) => ({ ...prev, fromDate: formattedDate }));
  };

  // Handle To Date change
  const handleToDateChange = (newValue) => {
    const formattedDate = newValue ? newValue.format("DD-MM-YYYY") : null;
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
            value={fromDate}
            format="DD-MM-YYYY" // Set the input format to DD-MM-YYYY
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
            value={toDate}
            format="DD-MM-YYYY" // Set the input format to DD-MM-YYYY
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
