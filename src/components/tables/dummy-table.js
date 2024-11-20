// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Box,
//   Grid,
//   Card,
//   IconButton,
//   Checkbox,
//   Drawer,
//   TextField,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
// } from "@mui/material";
// import { Edit, Delete, Visibility } from "@mui/icons-material";
// import { DataGrid } from "@mui/x-data-grid";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// const DummyTable = () => {
//   const [data, setData] = useState([]);
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 25,
//   });
//   const [filter, setFilter] = useState({
//     dateOption: "today", // Default option for date filter
//     exactDate: null,
//     fromDate: null,
//     toDate: null,
//   });

//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "member", headerName: "Member", width: 150 },
//     { field: "age", headerName: "Age", width: 90 },
//     { field: "city", headerName: "City", width: 100 },
//     { field: "profession", headerName: "Profession", width: 130 },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 150,
//       renderCell: (params) => dayjs(params.value).format("YYYY-MM-DD"),
//     },
//     {
//       field: "action",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params) => (
//         <Box>
//           <IconButton
//             component={Link}
//             to={`/table/edit/member/${params.row.id}`}
//             color="primary"
//           >
//             <Edit />
//           </IconButton>
//           <IconButton color="error" onClick={() => deleteHandle(params.row.id)}>
//             <Delete />
//           </IconButton>
//           <IconButton
//             component={Link}
//             to={`/table/view/member/${params.row.id}`}
//             color="success"
//           >
//             <Visibility />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const { page, pageSize } = paginationModel;
//         const response = await axios.get("http://localhost:7779/members", {
//           params: {
//             _page: page + 1,
//             _limit: pageSize,
//           },
//         });
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     };
//     fetchMembers();
//   }, [paginationModel]);

//   const deleteHandle = (id) => {
//     if (window.confirm("Would you like to delete this row?")) {
//       axios.delete(`http://localhost:7779/members/${id}`).then(() => {
//         setData((prevData) => prevData.filter((member) => member.id !== id));
//       });
//     }
//   };

//   const filteredData = data.filter((row) => {
//     const createdAtDate = dayjs(row.createdAt);
//     const today = dayjs();

//     switch (filter.dateOption) {
//       case "today":
//         return createdAtDate.isSame(today, "day");
//       case "exactDate":
//         return filter.exactDate
//           ? createdAtDate.isSame(filter.exactDate, "day")
//           : true;
//       case "beforeDate":
//         return filter.fromDate
//           ? createdAtDate.isBefore(filter.fromDate, "day")
//           : true;
//       case "afterDate":
//         return filter.toDate
//           ? createdAtDate.isAfter(filter.toDate, "day")
//           : true;
//       default:
//         return true;
//     }
//   });

//   const handlePaginationChange = (newPaginationModel) => {
//     setPaginationModel(newPaginationModel);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box pb={2}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <Box mx={2} mt={2} py={1} px={2}>
//                 <Typography variant="h5" align="left" fontFamily={"serif"}>
//                   Members Table
//                 </Typography>
//               </Box>
//               <Box p={2}>
//                 <Grid container spacing={2} alignItems="center">
//                   <Grid item xs={4}>
//                     <FormControl fullWidth>
//                       <InputLabel>Date Filter</InputLabel>
//                       <Select
//                         value={filter.dateOption}
//                         onChange={(e) =>
//                           setFilter((prev) => ({
//                             ...prev,
//                             dateOption: e.target.value,
//                           }))
//                         }
//                       >
//                         <MenuItem value="today">Today</MenuItem>
//                         <MenuItem value="exactDate">Exact Date</MenuItem>
//                         <MenuItem value="beforeDate">Before Date</MenuItem>
//                         <MenuItem value="afterDate">After Date</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   {filter.dateOption === "exactDate" && (
//                     <Grid item xs={4}>
//                       <DatePicker
//                         label="Exact Date"
//                         value={filter.exactDate}
//                         onChange={(newValue) =>
//                           setFilter((prev) => ({
//                             ...prev,
//                             exactDate: newValue,
//                           }))
//                         }
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Grid>
//                   )}

//                   {/* {filter.dateOption === "beforeDate" && (
//                     <Grid item xs={4}>
//                       <DatePicker
//                         label="Before Date"
//                         value={filter.fromDate}
//                         onChange={(newValue) => {
//                           setFilter((prev) => ({
//                             ...prev,
//                             fromDate: newValue,
//                             toDate:
//                               prev.toDate &&
//                               dayjs(newValue).isBefore(prev.toDate)
//                                 ? null
//                                 : prev.toDate,
//                           }));
//                         }}
//                         shouldDisableDate={(date) =>
//                           filter.toDate &&
//                           dayjs(date).isAfter(filter.toDate, "day")
//                         }
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Grid>
//                   )}
//                   {filter.dateOption === "afterDate" && (
//                     <Grid item xs={4}>
//                       <DatePicker
//                         label="After Date"
//                         value={filter.toDate}
//                         onChange={(newValue) => {
//                           setFilter((prev) => ({
//                             ...prev,
//                             fromDate: newValue,
//                             toDate:
//                               prev.toDate &&
//                               dayjs(newValue).isAfter(prev.toDate)
//                                 ? null
//                                 : prev.toDate,
//                           }));
//                         }}
//                         shouldDisableDate={(date) =>
//                           filter.fromDate &&
//                           dayjs(date).isBefore(filter.fromDate, "day")
//                         }
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Grid>
//                   )} */}

//                   {filter.dateOption === "beforeDate" && (
//                     <Grid item xs={4}>
//                       <DatePicker
//                         label="Before Date"
//                         value={filter.fromDate}
//                         onChange={(newValue) => {
//                           setFilter((prev) => ({
//                             ...prev,
//                             fromDate: newValue,
//                           }));
//                         }}
//                         shouldDisableDate={
//                           (date) =>
//                             filter.toDate &&
//                             dayjs(date).isAfter(filter.toDate, "day") // Disable dates after `toDate`
//                         }
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Grid>
//                   )}

//                   {filter.dateOption === "afterDate" && (
//                     <Grid item xs={4}>
//                       <DatePicker
//                         label="After Date"
//                         value={filter.toDate}
//                         onChange={(newValue) => {
//                           setFilter((prev) => ({
//                             ...prev,
//                             toDate: newValue,
//                           }));
//                         }}
//                         shouldDisableDate={(date) =>
//                           filter.fromDate &&
//                           dayjs(date).isBefore(filter.fromDate, "day")
//                         }
//                         renderInput={(params) => <TextField {...params} />}
//                       />
//                     </Grid>
//                   )}
//                 </Grid>
//                 <DataGrid
//                   rows={filteredData}
//                   columns={columns}
//                   checkboxSelection
//                   pagination
//                   pageSize={paginationModel.pageSize}
//                   page={paginationModel.page}
//                   onPaginationModelChange={handlePaginationChange}
//                 />
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default DummyTable;

// DummyTable.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography, Box, Grid, Card, IconButton } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import DateFilter from "./date-filter";
import DateFilterPopover from "./date-filter";

const DummyTable = () => {
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [filter, setFilter] = useState({
    dateOption: "today", // Default option for date filter
    exactDate: null,
    fromDate: null,
    toDate: null,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "member", headerName: "Member", width: 150 },
    { field: "age", headerName: "Age", width: 90 },
    { field: "city", headerName: "City", width: 100 },
    { field: "profession", headerName: "Profession", width: 130 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      renderCell: (params) => dayjs(params.value).format("YYYY-MM-DD"),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            component={Link}
            to={`/table/edit/member/${params.row.id}`}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => deleteHandle(params.row.id)}>
            <Delete />
          </IconButton>
          <IconButton
            component={Link}
            to={`/table/view/member/${params.row.id}`}
            color="success"
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
        const { page, pageSize } = paginationModel;
        const response = await axios.get("http://localhost:7779/members", {
          params: {
            _page: page + 1,
            _limit: pageSize,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [paginationModel]);

  const deleteHandle = (id) => {
    if (window.confirm("Would you like to delete this row?")) {
      axios.delete(`http://localhost:7779/members/${id}`).then(() => {
        setData((prevData) => prevData.filter((member) => member.id !== id));
      });
    }
  };

  const filteredData = data.filter((row) => {
    const createdAtDate = dayjs(row.createdAt);
    const today = dayjs();

    switch (filter.dateOption) {
      case "today":
        return createdAtDate.isSame(today, "day");
      case "exactDate":
        return filter.exactDate
          ? createdAtDate.isSame(filter.exactDate, "day")
          : true;
      case "beforeDate":
        return filter.fromDate
          ? createdAtDate.isBefore(filter.fromDate, "day")
          : true;
      case "afterDate":
        return filter.toDate
          ? createdAtDate.isAfter(filter.toDate, "day")
          : true;
      default:
        return true;
    }
  });

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box mx={2} mt={2} py={1} px={2}>
                <Typography variant="h5" align="left" fontFamily={"serif"}>
                  Members Table
                </Typography>
              </Box>
              <Box p={2}>
                {/* Use DateFilter component */}
                <DateFilterPopover filter={filter} setFilter={setFilter} />

                <DataGrid
                  rows={filteredData}
                  columns={columns}
                  checkboxSelection
                  pagination
                  pageSize={paginationModel.pageSize}
                  page={paginationModel.page}
                  onPaginationModelChange={handlePaginationChange}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default DummyTable;
