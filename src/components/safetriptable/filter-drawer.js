import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Drawer,
} from "@mui/material";
import DateRangeFilter from "./date-range-filter";

const FilterDrawer = (props) => {
  const {
    openDrawer,
    toggleDrawer,
    dateFilter,
    setDateFilter,
    applyHandler,
    sendCheckedDate,
    sendStatus,
    sendSearchType,
    sendSearchText,
    sendDateRange,
  } = props;
  const [status, setStatus] = useState("1");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [checkDate, setCheckDate] = useState("2");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  // console.log(dateFilter, "dateFilter");
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    sendStatus(event.target.value);
  };

  const handleChangeSearchType = (event) => {
    const Value = event.target.value;
    setSearchType(Value);
    sendSearchType(Value);
    setSearchText("");
  };
  const handleChangeDate = (event) => {
    const Value = event.target.value;
    setCheckDate(Value);
    sendCheckedDate(Value);
  };
  const handleSearchChange = (event) => {
    const Value = event.target.value;

    if (searchType === "1") {
      // Restrict to numbers only and limit to 10 digits for Phone Number
      if (/^\d*$/.test(Value) && Value.length <= 10) {
        console.log(Value, "SearchValue");
        setSearchText(Value);
        sendSearchText(Value);
      }
    } else {
      // Allow any value for other search types
      setSearchText(Value);
    }
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
      <Box p={2} width="500px">
        <Typography variant="h6" color="textPrimary" mb={2}>
          My Filters
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DateRangeFilter
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value="-1">Any</MenuItem>
                <MenuItem value="1">Started</MenuItem>
                <MenuItem value="2">End</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Check Date</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={checkDate}
                label="Check Date"
                onChange={handleChangeDate}
              >
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="2">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="search-select-label">Search Type</InputLabel>
              <Select
                labelId="search-select-label"
                id="search-select"
                value={searchType}
                label="Search Type"
                onChange={handleChangeSearchType}
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="1">Phone Number</MenuItem>
                <MenuItem value="2">Trip ID</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={handleSearchChange}
              // placeholder="Type to search..."
              placeholder={
                searchType === "1"
                  ? "Enter Phone Number (10 digits)"
                  : searchType === "2"
                  ? "Enter Trip ID"
                  : "Select Search Type"
              }
              disabled={searchType === ""}
              inputProps={{
                maxLength: searchType === "1" ? 10 : undefined, // Apply max length for Phone Number
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={applyHandler}
              sx={{ width: "40%" }}
            >
              Show
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
