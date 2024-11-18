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
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material"; // Import icons
import TableDropdown from "./table-dropdown";
import { DataGrid } from "@mui/x-data-grid";
import DateRangeFilter from "./date-range-filter";
import CreatedAtColumn from "./created-at-table";
import DateDropdown from "./date-dropdown";
import { v4 as uuidv4 } from "uuid";

const MembersTable = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows for the current page
  const [checkedBox, setCheckedBox] = useState(true);
  const [sortModel, setSortModel] = useState([{ field: "", sort: "" }]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
  }); // State for date range filter
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dummyFilters, setDummyFilters] = useState({
    filter1: "",
    filter2: "",
    filter3: "",
  });
  const [filterOption, setFilterOption] = useState("all"); // Track "All" or "Any" option

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
        const start = page * pageSize;
        const end = (page + 1) * pageSize;
        // Make the API call with pagination parameters
        const response = await axios.get("http://localhost:7779/members", {
          params: {
            _page: page + 1, // Assuming your API expects 1-based page index
            _limit: pageSize,
            _start: start,
            _end: end,
          },
        });

        // Add the 'Created At' date if it doesn't exist in the response
        const dataWithCreatedAt = response.data.map((member) => ({
          ...member,
          createdAt: member.createdAt || new Date().toISOString(), // Use current date if not present
        }));
        setData(dataWithCreatedAt);
        // Update state with the newly fetched data
        // setData(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [paginationModel]); // Dependency array ensures the effect is run whenever paginationModel changes

  const filteredData = data.filter((row) => {
    const { fromDate, toDate } = filter;

    // Normalize the createdAt date to midnight (removes time)
    const createdAtDate = new Date(row.createdAt);

    const normalizeDate = (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0); // Reset the time to midnight (start of the day)
      return d;
    };

    // Both fromDate and toDate filter
    if (fromDate && toDate) {
      const startDate = normalizeDate(fromDate);
      const endDate = normalizeDate(toDate);
      return createdAtDate >= startDate && createdAtDate <= endDate;
    }

    // Only fromDate filter
    if (fromDate) {
      const startDate = normalizeDate(fromDate);
      return createdAtDate >= startDate;
    }

    // Only toDate filter
    if (toDate) {
      const endDate = normalizeDate(toDate);
      return createdAtDate <= endDate;
    }

    // If no filter applied, return all rows
    return true;
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

  // Track selected rows for the current page
  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection); // Update selected rows
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

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setCheckedBox(checked);

    if (checked) {
      // Select all rows across all pages
      setSelectedRows(filteredData.map((row) => row.id));
    } else {
      // Deselect all rows
      setSelectedRows([]);
    }
  };
  const handleApplyClick = () => {
    if (selectedRows.length > 0) {
      alert(`Selected row IDs: ${selectedRows.join(", ")}`);
    } else {
      alert("No rows selected.");
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setDummyFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle selection of "All" or "Any" option
  const handleOptionChange = (event) => {
    setFilterOption(event.target.value);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all members?")) {
      axios
        .delete("http://localhost:7779/members") // Adjust this endpoint based on your backend
        .then(() => {
          // Reset the data to an empty array after successful deletion
          setData([]);
          alert("All members have been deleted.");
        })
        .catch((error) => {
          console.error("Error deleting all members:", error);
        });
    }
  };
  const showThebottomButtons = selectedRows.length > 0;

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
                  {/* DateRangeFilter Section (Left) */}
                  <Grid item xs={4} sx={{ ml: "25px", mt: "20px" }}>
                    <DateRangeFilter filter={filter} setFilter={setFilter} />
                  </Grid>

                  {/* Buttons and DateDropdown Section (Right) */}
                  <Grid item>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box width={"20%"} mr={7} mb={2}>
                        <DateDropdown />
                      </Box>
                      <Button
                        component={Link}
                        to="/table/add-member"
                        variant="outlined"
                        color="#787879"
                        // sx={{ color: "#fff", mr: 2 }}
                      >
                        Add +
                      </Button>
                      <Button
                        variant="outlined"
                        color="#787879"
                        onClick={exportToCSV}
                      >
                        Export to CSV
                      </Button>
                      <Button
                        variant="outlined"
                        color="#787879"
                        onClick={handleDeleteAll}
                      >
                        Delete All
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
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
                autoHeight
                // onSelectionModelChange={(e)=>handleSelectionChange(e)}
                onRowSelectionModelChange={handleSelectionChange}
                pagination
                pageSize={paginationModel.pageSize} // Number of rows per page
                page={paginationModel.page}
                rowCount={300}
                paginationMode="server"
                rowsPerPageOptions={[100, 50, 25, 10]}
                onPaginationModelChange={handlePaginationChange}
                sx={{
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
            </Box>

            {/* Conditional rendering of Apply/Cancel buttons */}
            {console.log("showThebottomButtons", selectedRows.length > 0)}
            {selectedRows.length > 0 && (
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
                  zIndex: 5,
                  p: 0.5,
                  mr: "530px",
                  borderRadius: "7px", // Set the border radius here
                  boxShadow: 3, // Optional: add shadow for better visibility
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
                  onClick={() => setSelectedRows([])} // Reset selection on cancel
                >
                  Cancel
                </Button>
                <Box mb={0.5}>
                  <TableDropdown />
                </Box>

                <Box display={"flex"} mt={1} mb={1}>
                  <Checkbox
                    checked={checkedBox}
                    onChange={handleSelectAllChange}
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

          {/* Filter Option Selector */}
          <FormControl fullWidth margin="normal" sx={{ alignItems: "center" }}>
            {/* <InputLabel>Filter</InputLabel> */}
            <Select
              sx={{ width: "20%" }}
              value={filterOption}
              onChange={handleOptionChange}
              label="Filter Condition"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="any">Any</MenuItem>
            </Select>
          </FormControl>

          {/* Filter 1 */}
          <TextField
            label="Filter 1"
            fullWidth
            name="filter1"
            value={dummyFilters.filter1}
            onChange={handleFilterChange}
            margin="normal"
          />

          {/* "All" or "Any" Text between the filters */}
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
            {filterOption === "all" ? "AND" : "OR"}
          </Typography>

          {/* Filter 2 */}
          <TextField
            label="Filter 2"
            fullWidth
            name="filter2"
            value={dummyFilters.filter2}
            onChange={handleFilterChange}
            margin="normal"
          />
        </Box>
        <Box m={2}>
          <Button variant="outlined" color="#787879" disabled>
            + Add Filter
          </Button>
        </Box>
        <Box m={2}>
          <DateRangeFilter filter={filter} setFilter={setFilter} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default MembersTable;
