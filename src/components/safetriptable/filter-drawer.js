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
  } = props;
  const [status, setStatus] = useState("1");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [checkDate, setCheckDate] = useState("2");
  console.log(dateFilter, "dateFilter");
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    sendStatus(event.target.value);
  };

  const handleChangeSearchType = (event) => {
    setSearchType(event.target.value);
    sendSearchType(event.target.value);
    setSearchText("");
  };
  const handleChangeDate = (event) => {
    setCheckDate(event.target.value);
    sendCheckedDate(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log("Search Text:", event.target.value); // Optional: Handle search logic here
    sendSearchText(event.target.value);
  };
  console.log(searchType, "SearchT");

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
              <InputLabel id="status-select-label">Check Date:</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={checkDate}
                label="Status"
                onChange={handleChangeDate}
              >
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="2">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Search Type:</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={searchType}
                label="Status"
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
              placeholder="Type to search..."
              disabled={
                searchType === "" // Read-only if Option 1 is selected
              }
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={applyHandler}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
