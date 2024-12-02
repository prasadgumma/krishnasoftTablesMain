// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Grid,
//   Drawer,
// } from "@mui/material";
// import DateRangeFilter from "./date-range-filter";
// import FilterComponent from "./combined-filters";
// import FilterExampleComponent from "./example-filter-component";

// const FilterDrawer = (props) => {
//   const {
//     openDrawer,
//     toggleDrawer,
//     customFilters,
//     setCustomFilters,
//     filter,
//     setFilter,
//     applyHandler,
//     data,
//     resetData,
//     handleCitySelect,
//     handleProfessionSelect,
//   } = props;

//   const [memberFilters, setMemberFilters] = useState([
//     { field: "member", condition: "Is", value: "" },
//     { field: "fatherName", condition: "Is", value: "" },
//   ]);

//   return (
//     <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
//       <Box p={2} width="500px">
//         <Typography variant="h6" color="textPrimary" mb={2}>
//           My Filters
//         </Typography>

//         <Grid container spacing={3}>
//           {/* Filter Condition */}
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Filter Condition</InputLabel>
//               <Select
//                 value={customFilters.filterCondition}
//                 onChange={(e) => {
//                   const filterCondition = e.target.value;
//                   setCustomFilters((prev) => ({
//                     ...prev,
//                     filterCondition,
//                   }));
//                 }}
//               >
//                 <MenuItem value="all">All</MenuItem>
//                 <MenuItem value="any">Any</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Member Filter */}
//           <Grid item xs={12}>
//             <TextField
//               label="Member"
//               fullWidth
//               name="member"
//               value={customFilters.member}
//               onChange={(e) =>
//                 setCustomFilters((prev) => ({
//                   ...prev,
//                   member: e.target.value,
//                 }))
//               }
//             />
//           </Grid>
//           {/* Member Filter */}
//           <Grid item xs={12}>
//             <FilterExampleComponent
//               filters={memberFilters}
//               setFilters={setMemberFilters}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Box textAlign={"center"}>
//               {customFilters.filterCondition === "all" ? (
//                 <Typography>
//                   <strong>AND</strong>
//                 </Typography>
//               ) : (
//                 <Typography>
//                   <strong>OR</strong>
//                 </Typography>
//               )}
//             </Box>
//           </Grid>

//           {/* Age Filter */}
//           <Grid item xs={6}>
//             <FormControl fullWidth>
//               <InputLabel>Age Condition</InputLabel>
//               <Select
//                 value={customFilters.ageCondition}
//                 onChange={(e) =>
//                   setCustomFilters((prev) => ({
//                     ...prev,
//                     ageCondition: e.target.value,
//                   }))
//                 }
//               >
//                 <MenuItem value="=">=</MenuItem>
//                 <MenuItem value="!=">!=</MenuItem>
//                 <MenuItem value="<">&lt;</MenuItem>
//                 <MenuItem value=">">&gt;</MenuItem>
//                 <MenuItem value="<=">&lt;=</MenuItem>
//                 <MenuItem value=">=">&gt;=</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Age"
//               fullWidth
//               name="age"
//               value={customFilters.age}
//               onChange={(e) =>
//                 setCustomFilters((prev) => ({
//                   ...prev,
//                   age: e.target.value,
//                 }))
//               }
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <DateRangeFilter filter={filter} setFilter={setFilter} />
//           </Grid>

//           {/* Action Buttons */}
//           <Grid item xs={6}>
//             <Button
//               variant="outlined"
//               color="primary"
//               fullWidth
//               onClick={applyHandler}
//             >
//               Apply Filters
//             </Button>
//           </Grid>
//           <Grid item xs={6}>
//             <Button
//               variant="outlined"
//               color="primary"
//               fullWidth
//               onClick={() => {
//                 setCustomFilters({
//                   member: "",
//                   age: "",
//                   ageCondition: "",
//                   filterCondition: "all",
//                 });
//                 setFilter({
//                   fromDate: null,
//                   toDate: null,
//                   dateOption: "",
//                   exactDate: null,
//                 });
//                 resetData();
//               }}
//             >
//               Reset Filters
//             </Button>
//           </Grid>
//           {/* Combined Filters */}
//           <Grid item xs={12}>
//             <FilterComponent
//               handleCitySelect={handleCitySelect}
//               handleProfessionSelect={handleProfessionSelect}
//               handleClearCitySelection={() => handleCitySelect("")}
//               handleClearProfessionSelection={() => handleProfessionSelect("")}
//             />
//           </Grid>

//           {/* Date Range Filter */}
//         </Grid>
//       </Box>
//     </Drawer>
//   );
// };

// export default FilterDrawer;

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
import FilterComponent from "./combined-filters";
import FilterExampleComponent from "./example-filter-component";
import DateRangePickerPage from "./date-range-filter";

const FilterDrawer = (props) => {
  const {
    openDrawer,
    toggleDrawer,
    customFilters,
    setCustomFilters,
    filter,
    setFilter,
    applyHandler,
    data,
    resetData,
    handleCitySelect,
    handleProfessionSelect,
    sendCheckedDate,
    sendStatus,
    sendSearchType,
  } = props;
  const [status, setStatus] = useState("1");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [checkDate, setCheckDate] = useState("2");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    sendStatus(event.target.value);
  };

  const handleChangeSearchType = (event) => {
    setSearchType(event.target.value);
    sendSearchType(event.target.value);
  };
  const handleChangeDate = (event) => {
    setCheckDate(event.target.value);
    sendCheckedDate(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log("Search Text:", event.target.value); // Optional: Handle search logic here
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
            <DateRangePickerPage filter={filter} setFilter={setFilter} />
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
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
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
                resetData();
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
