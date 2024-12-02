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
  TextField,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material"; // Import icons
import { DataGrid } from "@mui/x-data-grid";
import CreatedAtColumn from "./created-at-table";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FilterDrawer from "./filter-drawer";
import FilterComponent from "./combined-filters";
import TableBottomActions from "./bottom-table-actions";

const SafeTripTable = () => {
  const [data, setData] = useState([]);
  const [checkedBox, setCheckedBox] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [allFilterData, setAllFilterData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSelectedRows, setGlobalSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const [status, setStatus] = useState("1");
  const [searchType, setSearchType] = useState("");
  const [checkDate, setCheckDate] = useState("2");

  const [customFilters, setCustomFilters] = useState({
    member: "",
    age: "",
    ageCondition: "",
    filterCondition: "all",
  });

  const [filter, setFilter] = useState({
    fromDate: null,
    toDate: null,
    dateOption: "",
    exactDate: null,
  });

  const sendStatus = (data) => {
    setStatus(data);
    console.log(data, "Data");
  };

  const sendSearchType = (data) => {
    setSearchType(data);
  };
  const sendCheckedDate = (data) => {
    setCheckDate(data);
  };

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
  console.log(data);
  const columns = [
    { field: "id", headerName: "ID", width: 70, hide: !selectedColumns.id },
    {
      field: "tripid",
      headerName: "Trip ID",
      width: 70,
      hide: !selectedColumns.id,
    },

    // CreatedAtColumn({ field: "createdAt" }),
    {
      field: "mob",
      type: "number",
      headerName: "Mobile",
      width: 90,
      //   hide: !selectedColumns.age,
      sortable: true,
    },
    {
      field: "tname",
      headerName: "Name",
      filterable: true,
      width: 150,
      //   hide: !selectedColumns.member,
    },
    {
      field: "gend",
      headerName: "Gender",
      width: 130,
      //   hide: !selectedColumns.education,
    },
    {
      field: "vno",
      headerName: "Vehicle",
      width: 150,
      //   hide: !selectedColumns.fatherName,
    },

    {
      field: "dest",
      headerName: "Destination",
      width: 150,
      //   hide: !selectedColumns.motherName,
    },
    {
      field: "triptypnm",
      headerName: "Trip Type",
      width: 150,
      //   hide: !selectedColumns.husbandName,
    },
    {
      field: "livsts",
      headerName: "Trip Status",
      width: 100,
      //   hide: !selectedColumns.status,
      renderCell: (params) => (
        <Typography
          sx={{
            backgroundColor: params.row.livsts === 1 ? "#4caf50" : "#f44336", // Green for enabled, red for disabled
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            display: "inline-block", // Ensures the background fits the text
          }}
        >
          {params.row.livsts === 1 ? "Started" : "End"}
        </Typography>
      ),
    },
    {
      field: "stm",
      headerName: "Start Time",
      width: 100,
      //   hide: !selectedColumns.city,
    },
    {
      field: "etm",
      headerName: "End Time",
      width: 130,
      //   hide: !selectedColumns.profession,
    },
    {
      field: "tripenddispnm",
      headerName: "End Disposition",
      width: 200,
      //   hide: !selectedColumns.description,
    },
    {
      field: "'tripendesc",
      headerName: "End Discription",
      width: 100,
      hide: !selectedColumns.status,
      //   renderCell: (params) => (params.row.isEnabled ? "Enabled" : "Disabled"),
    },
    {
      field: "trip_dur_mins",
      headerName: "Duration(Mins)",
      width: 100,
      //   hide: !selectedColumns.status,
    },
    {
      field: "'lastloctm",
      headerName: "Last Sync",
      width: 100,
      //   hide: !selectedColumns.status,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 150,
      //   hide: !selectedColumns.action,
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

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log(checkDate);
        const { page, pageSize } = paginationModel;
        const start = page * pageSize;
        const end = (page + 1) * pageSize;
        const response = await axios.post(
          "http://192.168.21.71/devenv/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report",
          {
            lml: "966d65ba160b45dcbdb8978e9c0c8a03",
            dt: "02-12-2024/15-01-2025",
            tripsts: status,
            chkdt: checkDate,
            srch: "",
            stype: searchType,
          }
        );
        console.log(response.data.resp.trips_list, "Res");
        const overAllData = response.data.resp.trips_list.map(
          (member, index) => {
            return { ...member, id: index + 1 };
          }
        );

        setData(overAllData);
        setAllFilterData(overAllData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [paginationModel, searchQuery, status, checkDate, searchType]); // Dependency array ensures the effect is run whenever paginationModel changes

  //   const filteredData = data.filter((row) => {
  //     const { fromDate, toDate, dateOption, exactDate } = filter;
  //     const { member, age, ageCondition, filterCondition } = customFilters;

  //     // Normalize createdAt for date filters
  //     const createdAtDate = dayjs(row.createdAt);
  //     const today = dayjs();

  //     const normalizeDate = (date) => {
  //       const d = new Date(date);
  //       d.setHours(0, 0, 0, 0);
  //       return d;
  //     };

  //     // Check date range
  //     let passesDateFilter = true;

  //     switch (dateOption) {
  //       default:
  //         if (fromDate && toDate) {
  //           const startDate = normalizeDate(fromDate);
  //           const endDate = normalizeDate(toDate);
  //           passesDateFilter =
  //             createdAtDate >= startDate && createdAtDate <= endDate;
  //         } else if (fromDate) {
  //           const startDate = normalizeDate(fromDate);
  //           passesDateFilter = createdAtDate >= startDate;
  //         } else if (toDate) {
  //           const endDate = normalizeDate(toDate);
  //           passesDateFilter = createdAtDate <= endDate;
  //         }
  //     }
  //     // Check member filter
  //     const matchesMember = member
  //       ? row.member.toLowerCase().includes(member.toLowerCase())
  //       : true;

  //     // Apply age condition
  //     const ageValue = parseInt(age, 10);
  //     let matchesAge = true;
  //     if (age && !isNaN(ageValue)) {
  //       switch (ageCondition) {
  //         case "<":
  //           matchesAge = row.age < ageValue;
  //           break;
  //         case ">":
  //           matchesAge = row.age > ageValue;
  //           break;
  //         case "<=":
  //           matchesAge = row.age <= ageValue;
  //           break;
  //         case ">=":
  //           matchesAge = row.age >= ageValue;
  //           break;
  //         case "=":
  //           matchesAge = row.age === ageValue;
  //           break;
  //         case "!=":
  //           matchesAge = row.age !== ageValue;
  //           break;
  //         default:
  //           matchesAge = false; // Default to match all if no condition selected
  //       }
  //     }

  //     // Apply AND or OR logic based on filterCondition
  //     const passesCustomFilter =
  //       filterCondition === "all"
  //         ? matchesMember && matchesAge // AND condition
  //         : matchesMember || matchesAge; // OR condition

  //     return passesDateFilter && passesCustomFilter;
  //   });

  const resetData = () => {
    setAllFilterData(data); // Restore to the unfiltered data set
  };
  //   const applyHandler = () => {
  //     setAllFilterData(filteredData);
  //   };

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

  const handleProfessionSelect = (newProfession) => {
    if (newProfession) {
      const filterProfessionData = data.filter(
        (row) => row.profession === newProfession
      );
      setAllFilterData(filterProfessionData);
    } else {
      setAllFilterData(data); // Reset to original data when no city is selected
    }
  };
  const handleCitySelect = (newCity) => {
    if (newCity) {
      const filterCityData = data.filter((row) => row.city === newCity);
      setAllFilterData(filterCityData);
    } else {
      setAllFilterData(data); // Reset to original data when no city is selected
    }
  };

  const handleSelectionChange = (newSelection) => {
    // Get the rows visible on the current page
    const visibleRows = data.slice(0, paginationModel.pageSize);
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
  };

  const handleSelection = (eventOrIds) => {
    if (typeof eventOrIds === "object" && eventOrIds.target) {
      // Handle "Select All" checkbox change
      const { checked } = eventOrIds.target;
      const allIds = data.map((row) => row.id);
      if (checked) {
        // Select all rows across the filtered data
        setGlobalSelectedRows((prev) =>
          Array.from(new Set([...prev, ...allIds]))
        );
        setGlobalSelectedRows(allIds); // Select all rows on the current page
        setCheckedBox(checked);
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
  return (
    <LocalizationProvider>
      <Box pb={2}>
        <Grid container spacing={4}>
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
                display={"flex"}
                gap={6}
              >
                <Typography
                  variant="h5"
                  color="#787879"
                  align="left"
                  fontFamily={"serif"}
                  width={"18%"}
                >
                  Trip List Reports
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

                    <Grid item>
                      <Box display="flex" alignItems="center" gap={2} m={2}>
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
                          onClick={toggleDrawer}
                        >
                          My Filters
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <DataGrid
                  rows={data}
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
                    {/* <strong>
                      {globalSelectedRows.length === data.length
                        ? "SelectedAll"
                        : globalSelectedRows.length}
                    </strong> */}
                  </span>
                  <span>
                    {/* Total Rows: <strong>{data.length}</strong> */}
                  </span>
                </Box>
              </Box>

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
                    <TableBottomActions />
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
        <FilterDrawer
          openDrawer={openDrawer}
          toggleDrawer={toggleDrawer}
          customFilters={customFilters}
          setCustomFilters={setCustomFilters}
          filter={filter}
          setFilter={setFilter}
          data={data}
          //   applyHandler={applyHandler}
          setData={setData}
          resetData={resetData} // Pass the reset function
          handleProfessionSelect={handleProfessionSelect}
          handleCitySelect={handleCitySelect}
          sendStatus={sendStatus}
          sendSearchType={sendSearchType}
          sendCheckedDate={sendCheckedDate}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SafeTripTable;
