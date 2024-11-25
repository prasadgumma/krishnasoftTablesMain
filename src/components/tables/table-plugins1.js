import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  IconButton,
  Checkbox,
  Drawer,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material"; // Import icons
import TableDropdown from "./table-dropdown";
import { DataGrid } from "@mui/x-data-grid";
import DateRangeFilter from "./date-range-filter";
import CreatedAtColumn from "./created-at-table";
import { v4 as uuidv4 } from "uuid";

const MembersTable = () => {
  const [data, setData] = useState([]);
  const [checkedBox, setCheckedBox] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
  }); // State for date range filter
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const [customFilters, setCustomFilters] = useState({
    member: "",
    age: "",
    ageCondition: "=", // Default condition
    filterCondition: "all", // 'all' for AND, 'any' for OR
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSelectedRows, setGlobalSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(globalSelectedRows);

  const [selectedColumns] = useState({
    id: true,
    sNo: true,
    member: true,
    age: true,
    education: true,
    fatherName: false,
    motherName: false,
    husbandName: false,
    city: true,
    profession: true,
    description: false,
    status: true,
    action: true,
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { page, pageSize } = paginationModel;
        const start = page * 25;
        const end = (page + 1) * 25;

        // Make the API call with pagination parameters
        const response = await axios.get("http://localhost:7779/members", {
          params: {
            _page: page + 1, // Assuming your API expects 1-based page index
            _limit: 25,
            _start: start,
            _end: end,
            _search: searchQuery,
          },
        });
        console.log(response, "Res");
        const dataWithCreatedAt = response.data.map((member) => {
          // Use localStorage or state to persist createdAt
          const existingCreatedAt =
            member.createdAt || localStorage.getItem(`createdAt_${member.id}`);
          const createdAt = existingCreatedAt || new Date().toISOString();

          // Store the createdAt value in localStorage (or any persistent storage)
          if (!existingCreatedAt) {
            localStorage.setItem(`createdAt_${member.id}`, createdAt);
          }

          return { ...member, createdAt };
        });

        setData(dataWithCreatedAt);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [paginationModel, searchQuery]); // Dependency array ensures the effect is run whenever paginationModel changes

  const filteredData = data.filter((row) => {
    const { fromDate, toDate } = filter;
    const { member, age, ageCondition, filterCondition } = customFilters;

    // Normalize createdAt for date filters
    const createdAtDate = new Date(row.createdAt);

    const normalizeDate = (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    // Check date range
    let passesDateFilter = true;
    if (fromDate && toDate) {
      const startDate = normalizeDate(fromDate);
      const endDate = normalizeDate(toDate);
      passesDateFilter = createdAtDate >= startDate && createdAtDate <= endDate;
    } else if (fromDate) {
      const startDate = normalizeDate(fromDate);
      passesDateFilter = createdAtDate >= startDate;
    } else if (toDate) {
      const endDate = normalizeDate(toDate);
      passesDateFilter = createdAtDate <= endDate;
    }

    // Check member filter
    const matchesMember = member
      ? row.member.toLowerCase().includes(member.toLowerCase())
      : true;

    // Apply age condition
    const ageValue = parseInt(age, 10);
    let matchesAge = true;
    if (age && !isNaN(ageValue)) {
      switch (ageCondition) {
        case "<":
          matchesAge = row.age < ageValue;
          break;
        case ">":
          matchesAge = row.age > ageValue;
          break;
        case "<=":
          matchesAge = row.age <= ageValue;
          break;
        case ">=":
          matchesAge = row.age >= ageValue;
          break;
        case "=":
          matchesAge = row.age === ageValue;
          break;
        case "!=":
          matchesAge = row.age !== ageValue;
          break;
        default:
          matchesAge = true; // Default to match all if no condition selected
      }
    }

    // Apply AND or OR logic based on filterCondition
    const passesCustomFilter =
      filterCondition === "all"
        ? matchesMember && matchesAge // AND condition
        : matchesMember || matchesAge; // OR condition

    return passesDateFilter && passesCustomFilter;
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70, hide: !selectedColumns.id },
    {
      field: "member",
      headerName: "Member",
      filterable: true,
      width: 150,
      hide: !selectedColumns.member,
    },
    CreatedAtColumn({ field: "createdAt" }),
    {
      field: "age",
      type: "number",
      headerName: "Age",
      width: 90,
      hide: !selectedColumns.age,
      sortable: true,
    },
    {
      field: "education",
      headerName: "Education",
      width: 130,
      hide: !selectedColumns.education,
    },
    {
      field: "fatherName",
      headerName: "Father's Name",
      width: 150,
      hide: !selectedColumns.fatherName,
    },
    {
      field: "motherName",
      headerName: "Mother's Name",
      width: 150,
      hide: !selectedColumns.motherName,
    },
    {
      field: "husbandName",
      headerName: "Husband's Name",
      width: 150,
      hide: !selectedColumns.husbandName,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
      hide: !selectedColumns.city,
    },
    {
      field: "profession",
      headerName: "Profession",
      width: 130,
      hide: !selectedColumns.profession,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      hide: !selectedColumns.description,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      hide: !selectedColumns.status,
      renderCell: (params) => (params.row.isEnabled ? "Enabled" : "Disabled"),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      hide: !selectedColumns.action,
      renderCell: (params) => (
        <Box>
          <IconButton
            component={Link}
            to={`/table/edit/member/${params.row.id}`}
            color="primary"
            sx={{ mr: 1 }}
          >
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => deleteHandle(params.row.id)}>
            <Delete />
          </IconButton>
          <IconButton
            component={Link}
            to={`/table/view/member/${params.row.id}`} // View Member route
            color="success" // Use a different color to distinguish it
            sx={{ mr: 1 }}
          >
            <Visibility />
          </IconButton>
        </Box>
      ),
    },
  ];

  const deleteHandle = (id) => {
    if (window.confirm("Would you like to delete this row?")) {
      axios.delete(`http://localhost:7779/members/${id}`).then(() => {
        setData((prevData) => prevData.filter((member) => member.id !== id));
      });
    }
  };

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  // Export to CSV function
  const exportToCSV = () => {
    const headers =
      columns
        .filter((col) => !col.hide)
        .map((col) => col.headerName)
        .join(",") + "\n";

    const rows = data
      .map((row) =>
        columns
          .filter((col) => !col.hide)
          .map((col) => row[col.field] || "")
          .join(",")
      )
      .join("\n");

    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "members_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleApplyClick = () => {
    if (globalSelectedRows.length > 0) {
      alert(`Selected row IDs: ${globalSelectedRows.join(", ")}`);
    } else {
      alert("No rows selected.");
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleFilterChangeDate = (newFilterModel) => {
    setFilterModel(newFilterModel); // Update filter model
  };

  const handleSelectionChange = (newSelection) => {
    console.log(newSelection, "NewSl");
    // Get the rows visible on the current page
    const visibleRows = data.slice(0, paginationModel.pageSize);
    console.log(paginationModel, "Pmodel");
    // Map visible rows to their IDs
    const visibleRowIds = visibleRows.map((row) => row.id);

    // Filter the selected IDs to include only those in visible rows
    const updatedSelection = newSelection.filter((id) =>
      visibleRowIds.includes(id)
    );

    // Update the global selection with visible rows only
    setGlobalSelectedRows(updatedSelection);
    if (visibleRowIds === 25) {
      setCheckedBox(true);
    } else {
      setCheckedBox(false);
    }

    console.log(checkedBox);
  };

  const handleSelection = (eventOrIds) => {
    if (typeof eventOrIds === "object" && eventOrIds.target) {
      // Handle "Select All" checkbox change
      const { checked } = eventOrIds.target;
      console.log(checked, "check");
      const allIds = filteredData.map((row) => row.id);
      if (checked) {
        console.log(allIds, "allids");
        // Select all rows across the filtered data
        setGlobalSelectedRows((prev) =>
          Array.from(new Set([...prev, ...allIds]))
        );
        setGlobalSelectedRows(allIds); // Select all rows on the current page
        setCheckedBox(checked);
        // alert(`Selected all ${allIds.length} rows.`);
        alert(
          `Action will be applied to all items selected by the filter  ${allIds.length} rows.`
        );
      } else {
        // Deselect all rows
        setGlobalSelectedRows(
          (prev) => prev.filter((id) => !allIds.includes(id)) // Remove filtered rows from global selection
        );
        setCheckedBox((prev) => !prev); // Reset local selection for the current page
        alert("Deselected all rows.");
      }
    }
  };

  const showThebottomButtons = globalSelectedRows.length > 0;
  console.log(data, "Data");
  return (
    <Box pb={2}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <Box
              mx={2}
              mt={2}
              py={1}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <Typography
                variant="h5"
                color="#787879"
                align="left"
                fontFamily={"serif"}
              >
                Members Table
              </Typography>
            </Box>
            <Box p={2}>
              <Grid
                container
                spacing={2}
                alignItems="right" // Vertically center the items
              >
                <Grid
                  container
                  spacing={2}
                  alignItems="center" // Vertically center the items
                  justifyContent="space-between" // This will push items to the left and right
                >
                  <Grid item xs={4} sx={{ ml: "25px", mt: "20px" }}>
                    <TextField
                      label="Search"
                      variant="outlined"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
                      sx={{
                        mb: 2.5, // Optional margin for spacing
                        "& .MuiInputBase-root": {
                          height: "35px", // Set the height of the input field
                          padding: "0 8px", // Adjust padding to keep it compact
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          height: "45px", // Ensure the outline matches the input field height
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px", // Adjust label position to be vertically aligned
                          fontSize: "1rem", // Optional: smaller label text
                        },
                      }}
                    />
                  </Grid>

                  {/* Buttons and DateDropdown Section (Right) */}
                  <Grid item>
                    <Box display="flex" alignItems="center" gap={2} m={2}>
                      <Button
                        variant="outlined"
                        color="#787879"
                        onClick={exportToCSV}
                      >
                        Export to CSV
                      </Button>

                      {/* Add Button for opening the Drawer */}
                      <Button
                        variant="outlined"
                        color="#787879"
                        onClick={toggleDrawer}
                      >
                        My Filters
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <DataGrid
                rows={filteredData}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick={false}
                rowSelectionModel={globalSelectedRows}
                onRowSelectionModelChange={handleSelectionChange}
                pagination
                pageSize={paginationModel.pageSize}
                page={paginationModel.page}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  },
                }}
                pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
                rowCount={300} // Make sure this reflects the total number of members
                onPaginationModelChange={handlePaginationChange}
                filterModel={filterModel}
                onFilterModelChange={handleFilterChangeDate}
                paginationMode="client" // Client-side pagination
                loading={loading}
                sx={{
                  height: 600, // Set a fixed height
                  width: "100%",
                  // overflowY: "auto", // Enable vertical scrolling
                  "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
                    color: "white",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#787877",
                    color: "white",
                    maxHeight: 70,
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "white",
                  },
                  "& .MuiDataGrid-columnMenuIcon": {
                    color: "#fffff !important",
                  },
                  "& .MuiDataGrid-menu": {
                    backgroundColor: "#1976d2",
                  },
                  "& .MuiMenuItem-root": {
                    color: "white",
                  },
                  "& .MuiDataGrid-menuItem-root:hover": {
                    backgroundColor: "#1565c0",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-menuIconButton": {
                    opacity: 1,
                    color: "white",
                  },
                  "& .MuiDataGrid-filterIcon": {
                    opacity: 1,
                    color: "white",
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                  backgroundColor: "#ffff",
                  borderTop: "1px solid #ccc",
                }}
              >
                <span>
                  Selected Rows:{" "}
                  <strong>
                    {globalSelectedRows.length === filteredData.length
                      ? "SelectedAll"
                      : globalSelectedRows.length}
                  </strong>
                </span>
                <span>
                  Total Rows: <strong>{filteredData.length}</strong>
                </span>
              </Box>
            </Box>

            {/* Conditional rendering of Apply/Cancel buttons */}

            {showThebottomButtons && (
              <Box
                key={uuidv4()}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  m: 2,
                  position: "fixed",
                  bottom: 10,
                  width: "83%",
                  backgroundColor: "#787877",
                  gap: 2,
                  zIndex: 100,
                  p: 0.5,
                  mr: "530px",
                  borderRadius: "7px", // Set the border radius here
                  boxShadow: 3, // Optional: add shadow for better visibility
                  mb: 15,
                }}
              >
                <Button
                  variant="outlined"
                  color="white"
                  onClick={handleApplyClick}
                  sx={{ maxHeight: 35, mt: 1.2, color: "#ffff", ml: 2 }}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  color="white"
                  sx={{ maxHeight: 35, mt: 1.2, color: "#ffff" }}
                  onClick={() => setGlobalSelectedRows([])} // Reset selection on cancel
                >
                  Cancel
                </Button>
                <Box mb={0.5}>
                  <TableDropdown />
                </Box>

                <Box display={"flex"} mt={1} mb={1}>
                  <Checkbox
                    checked={checkedBox}
                    onChange={handleSelection}
                    value="checkedBox"
                    sx={{
                      color: "white", // Set the checkbox color to white
                      "&.Mui-checked": {
                        color: "white", // Set checked state color to white
                      },
                    }}
                  />
                  <Typography variant="h6" color="#ffff" sx={{ mt: 0.7 }}>
                    For All
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Drawer Component */}

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
                <MenuItem value="all">All (AND)</MenuItem>
                <MenuItem value="any">Any (OR)</MenuItem>
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
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ mt: 2 }}>
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              setCustomFilters({ member: "", age: "", filterCondition: "all" })
            }
          >
            Reset Filters
          </Button>
        </Box>
        <Box m={2}>
          <Typography m={2}>Date Filters</Typography>
          <DateRangeFilter filter={filter} setFilter={setFilter} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default MembersTable;
