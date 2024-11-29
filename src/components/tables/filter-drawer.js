import React from "react";
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
import DateFilterPopover from "./date-filter";

const FilterDrawer = ({
  openDrawer,
  toggleDrawer,
  customFilters,
  setCustomFilters,
  filter,
  setFilter,
  applyHandler,
  data,
  resetData,
  setAllFilterData,
}) => {
  return (
    <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
      <Box p={2} width="500px">
        <Typography variant="h6" color="textPrimary">
          My Filters
        </Typography>

        <Box textAlign={"center"}>
          <FormControl sx={{ width: "50%" }} margin="normal">
            <InputLabel>Filter Condition</InputLabel>
            <Select
              value={customFilters.filterCondition}
              onChange={(e) => {
                const filterCondition = e.target.value;
                setCustomFilters((prev) => ({
                  ...prev,
                  filterCondition,
                }));
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="any">Any</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Member"
          fullWidth
          name="member"
          value={customFilters.member}
          onChange={(e) =>
            setCustomFilters((prev) => ({
              ...prev,
              member: e.target.value,
            }))
          }
          margin="normal"
        />

        <Box textAlign={"center"}>
          {customFilters.filterCondition === "all" ? (
            <Typography>
              <strong>AND</strong>
            </Typography>
          ) : (
            <Typography>
              <strong>OR</strong>
            </Typography>
          )}
        </Box>

        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6} mt={2}>
              <FormControl fullWidth>
                <InputLabel>Age Condition</InputLabel>
                <Select
                  value={customFilters.ageCondition}
                  onChange={(e) =>
                    setCustomFilters((prev) => ({
                      ...prev,
                      ageCondition: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="=">=</MenuItem>
                  <MenuItem value="!=">!=</MenuItem>
                  <MenuItem value="<">&lt;</MenuItem>
                  <MenuItem value=">">&gt;</MenuItem>
                  <MenuItem value="<=">&lt;=</MenuItem>
                  <MenuItem value=">=">&gt;=</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                fullWidth
                name="age"
                value={customFilters.age}
                onChange={(e) =>
                  setCustomFilters((prev) => ({
                    ...prev,
                    age: e.target.value,
                  }))
                }
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box m={2}>
        <DateRangeFilter filter={filter} setFilter={setFilter} />
      </Box>
      <Box display={"flex"} ml={10}>
        <Box m={2}>
          <Button variant="outlined" color="primary" onClick={applyHandler}>
            Apply Filters
          </Button>
        </Box>
        <Box m={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setCustomFilters({
                member: "",
                age: "",
                ageCondition: "",
                filterCondition: "all",
              });
              setFilter({
                fromDate: null,
                toDate: null,
                dateOption: "",
                exactDate: null,
              });
              resetData(); // Call a function from the parent to reset data
            }}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
