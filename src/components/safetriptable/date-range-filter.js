import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateRangeFilter = ({ filter, setFilter }) => {
  const handleFromDateChange = (newValue) => {
    setFilter((prev) => ({ ...prev, fromDate: newValue }));
  };

  const handleToDateChange = (newValue) => {
    setFilter((prev) => ({ ...prev, toDate: newValue }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box mb={2}>
        <Typography gutterBottom>Date Filters</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* From Date Picker */}
          <DatePicker
            label="From Date"
            value={filter.fromDate ? dayjs(filter.fromDate) : null}
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
            value={filter.toDate ? dayjs(filter.toDate) : null}
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
