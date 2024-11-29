// // //Data GRid Model-------------------------------------------------------------

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Link } from "react-router-dom";
// // // import { Typography, Button, Box, Grid, Card, IconButton } from "@mui/material";
// // // import { DataGrid } from "@mui/x-data-grid";
// // // import { Edit, Delete } from "@mui/icons-material"; // Import icons
// // // // import DialogBox from "./members-dialogue";
// // // import TableDropdown from "./table-dropdown";

// // // const MembersTable = () => {
// // //   const [data, setData] = useState([]);
// // //   const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
// // //   const [sortModel, setSortModel] = useState([{ field: "", sort: "" }]);
// // //   const [paginationModel, setPaginationModel] = useState({
// // //     page: 0,
// // //     pageSize: 25,
// // //   });
// // //   const [selectedColumns] = useState({
// // //     id: true,
// // //     sNo: true,
// // //     member: true,
// // //     age: true,
// // //     education: true,
// // //     fatherName: false,
// // //     motherName: false,
// // //     husbandName: false,
// // //     city: true,
// // //     profession: true,
// // //     description: false,
// // //     status: true,
// // //     action: true,
// // //   });

// // //   useEffect(() => {
// // //     const fetchMembers = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:7777/members");
// // //         setData(response.data);
// // //       } catch (error) {
// // //         console.error(error);
// // //       }
// // //     };
// // //     fetchMembers();
// // //   }, []);

// // //   const columns = [
// // //     { field: "id", headerName: "ID", width: 70, hide: !selectedColumns.id },

// // //     {
// // //       field: "member",
// // //       headerName: "Member",
// // //       filterable: true,
// // //       width: 150,
// // //       hide: !selectedColumns.member,
// // //     },
// // //     {
// // //       field: "age",
// // //       type: "number",
// // //       headerName: "Age",
// // //       width: 90,
// // //       hide: !selectedColumns.age,
// // //       sortable: true,
// // //     },
// // //     {
// // //       field: "education",
// // //       headerName: "Education",
// // //       width: 130,
// // //       hide: !selectedColumns.education,
// // //     },
// // //     {
// // //       field: "fatherName",
// // //       headerName: "Father's Name",
// // //       width: 150,
// // //       hide: !selectedColumns.fatherName,
// // //     },
// // //     {
// // //       field: "motherName",
// // //       headerName: "Mother's Name",
// // //       width: 150,
// // //       hide: !selectedColumns.motherName,
// // //     },
// // //     {
// // //       field: "husbandName",
// // //       headerName: "Husband's Name",
// // //       width: 150,
// // //       hide: !selectedColumns.husbandName,
// // //     },
// // //     {
// // //       field: "city",
// // //       headerName: "City",
// // //       width: 100,
// // //       hide: !selectedColumns.city,
// // //     },
// // //     {
// // //       field: "profession",
// // //       headerName: "Profession",
// // //       width: 130,
// // //       hide: !selectedColumns.profession,
// // //     },
// // //     {
// // //       field: "description",
// // //       headerName: "Description",
// // //       width: 200,
// // //       hide: !selectedColumns.description,
// // //     },
// // //     {
// // //       field: "status",
// // //       headerName: "Status",
// // //       width: 100,
// // //       hide: !selectedColumns.status,
// // //       renderCell: (params) => (params.row.isEnabled ? "Enabled" : "Disabled"),
// // //     },
// // //     {
// // //       field: "action",
// // //       headerName: "Actions",
// // //       width: 150,
// // //       hide: !selectedColumns.action,
// // //       renderCell: (params) => (
// // //         <Box>
// // //           <IconButton
// // //             component={Link}
// // //             to={`/edit/member/${params.row.id}`}
// // //             color="primary"
// // //             sx={{ mr: 1 }}
// // //           >
// // //             <Edit />
// // //           </IconButton>
// // //           <IconButton color="error" onClick={() => deleteHandle(params.row.id)}>
// // //             <Delete />
// // //           </IconButton>
// // //         </Box>
// // //       ),
// // //     },
// // //   ];

// // //   const deleteHandle = (id) => {
// // //     if (window.confirm("Would you like to delete this row?")) {
// // //       axios.delete(`http://localhost:7777/members/${id}`).then(() => {
// // //         setData((prevData) => prevData.filter((member) => member.id !== id));
// // //       });
// // //     }
// // //   };

// // //   const handlePaginationChange = (newPaginationModel) => {
// // //     setPaginationModel(newPaginationModel);
// // //   };

// // //   // Track selected rows
// // //   const handleSelectionChange = (newSelection) => {
// // //     setSelectedRows(newSelection.selectionModel); // Update selected rows
// // //     console.log("Selected rows:", newSelection.selectionModel); // Debugging line
// // //   };

// // //   // Export to CSV function
// // //   const exportToCSV = () => {
// // //     const headers =
// // //       columns
// // //         .filter((col) => !col.hide)
// // //         .map((col) => col.headerName)
// // //         .join(",") + "\n";

// // //     const rows = data
// // //       .map((row) =>
// // //         columns
// // //           .filter((col) => !col.hide)
// // //           .map((col) => row[col.field] || "")
// // //           .join(",")
// // //       )
// // //       .join("\n");

// // //     const csvContent = headers + rows;

// // //     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// // //     const link = document.createElement("a");
// // //     if (link.download !== undefined) {
// // //       const url = URL.createObjectURL(blob);
// // //       link.setAttribute("href", url);
// // //       link.setAttribute("download", "members_list.csv");
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     }
// // //   };
// // //   const showThebottomButtons = selectedRows.length > 0;

// // //   return (
// // //     <Box pt={4} pb={2}>
// // //       <Grid container spacing={6}>
// // //         <Grid item xs={12}>
// // //           <Card sx={{ height: "100%" }}>
// // //             <Box
// // //               mx={2}
// // //               mt={-3}
// // //               py={1}
// // //               px={2}
// // //               variant="gradient"
// // //               bgColor="info"
// // //               borderRadius="lg"
// // //               coloredShadow="info"
// // //             >
// // //               <Typography variant="h5" color="white">
// // //                 Members Table
// // //               </Typography>
// // //             </Box>
// // //             <Box p={2}>
// // //               <Box
// // //                 sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
// // //               >
// // //                 <Typography variant="h5" gutterBottom>
// // //                   Members List
// // //                 </Typography>
// // //                 <Box>
// // //                   <Button
// // //                     component={Link}
// // //                     to="/add/member"
// // //                     variant="contained"
// // //                     color="success"
// // //                     sx={{ color: "#fff", mr: 2 }}
// // //                   >
// // //                     Add +
// // //                   </Button>
// // //                   <Button
// // //                     variant="contained"
// // //                     color="primary"
// // //                     onClick={exportToCSV}
// // //                   >
// // //                     Export to CSV
// // //                   </Button>
// // //                 </Box>
// // //               </Box>

// // //               <DataGrid
// // //                 rows={data}
// // //                 columns={columns}
// // //                 pageSize={paginationModel.pageSize}
// // //                 paginationModel={paginationModel}
// // //                 onPaginationModelChange={handlePaginationChange}
// // //                 rowsPerPageOptions={[10, 25, 50]}
// // //                 checkboxSelection
// // //                 disableSelectionOnClick
// // //                 sortModel={sortModel}
// // //                 onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
// // //                 autoHeight
// // //                 onSelectionModelChange={handleSelectionChange} // This is for when individual checkboxes are toggled
// // //                 onRowSelectionModelChange={(ids) => {
// // //                   // This will handle row selection changes
// // //                   const selectedIDs = new Set(ids);
// // //                   const selectedRows = data.filter((row) =>
// // //                     selectedIDs.has(row.id)
// // //                   );
// // //                   setSelectedRows(selectedRows);
// // //                 }}
// // //                 sx={{
// // //                   "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
// // //                     color: "white",
// // //                   },
// // //                   "& .MuiDataGrid-columnHeader": {
// // //                     backgroundColor: "#787877",
// // //                     color: "white",
// // //                     maxHeight: 50,
// // //                   },
// // //                   "& .MuiDataGrid-columnHeaderTitle": {
// // //                     color: "white",
// // //                   },

// // //                   "& .MuiDataGrid-columnMenuIcon": {
// // //                     color: "#fffff !important",
// // //                   },
// // //                   "& .MuiDataGrid-menu": {
// // //                     backgroundColor: "#1976d2",
// // //                   },
// // //                   "& .MuiMenuItem-root": {
// // //                     color: "white",
// // //                   },
// // //                   "& .MuiDataGrid-menuItem-root:hover": {
// // //                     backgroundColor: "#1565c0",
// // //                   },
// // //                   "& .MuiDataGrid-sortIcon": {
// // //                     opacity: 1,
// // //                     color: "white",
// // //                   },
// // //                   "& .MuiDataGrid-menuIconButton": {
// // //                     opacity: 1,
// // //                     color: "white",
// // //                   },
// // //                   "& .MuiDataGrid-filterIcon": {
// // //                     opacity: 1,
// // //                     color: "white",
// // //                   },
// // //                 }}
// // //               />
// // //             </Box>

// // //             {/* Conditional rendering of Apply/Cancel buttons */}
// // //             {showThebottomButtons && (
// // //               <Box
// // //                 sx={{
// // //                   display: "flex",
// // //                   justifyContent: "start",
// // //                   m: 2,
// // //                   position: "fixed",
// // //                   bottom: 0,
// // //                   width: "83%",
// // //                   backgroundColor: "#787877",
// // //                   gap: 2,
// // //                   zIndex: 5,
// // //                   p: 0.5,
// // //                   mr: "500px",
// // //                 }}
// // //               >
// // //                 <Button
// // //                   variant="outlined"
// // //                   color="white"
// // //                   onClick={() => alert("Apply action triggered")}
// // //                   sx={{ maxHeight: 35, mt: 1.2, color: "#ffff" }}
// // //                 >
// // //                   Apply
// // //                 </Button>
// // //                 <Button
// // //                   variant="outlined"
// // //                   color="white"
// // //                   sx={{ maxHeight: 35, mt: 1.2, color: "#ffff" }}
// // //                   onClick={() => setSelectedRows([])} // Reset selection on cancel
// // //                 >
// // //                   Cancel
// // //                 </Button>
// // //                 <Box mb={0.5}>
// // //                   <TableDropdown />
// // //                 </Box>
// // //               </Box>
// // //             )}
// // //           </Card>
// // //         </Grid>
// // //       </Grid>
// // //     </Box>
// // //   );
// // // };

// // // export default MembersTable;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link, useNavigate } from "react-router-dom";
// // import {
// //   Typography,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableRow,
// //   Box,
// //   Grid,
// //   Card,
// //   Checkbox,
// //   IconButton,
// //   Menu,
// //   MenuItem,
// //   TableHead,
// // } from "@mui/material";
// // import SettingsIcon from "@mui/icons-material/Settings";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import Pagination from "./members-pagination";
// // import DialogBox from "./members-dialogue";
// // import TableBottomDropdown from "./table-dropdown";
// // import MemberSearch from "./member-search";
// // import CustomSelect from "../CustomSelect/CustomSelect";

// // const MembersTable2 = () => {
// //   const [data, setData] = useState([]);
// //   console.log(data, 'Data')
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [selectAllPages, setSelectAllPages] = useState(false); // Track All Pages selection
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [allMembers, setAllMembers] = useState([]); // This will hold all member data
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedColumns, setSelectedColumns] = useState({
// //     id: false,
// //     sNo: true,
// //     member: true,
// //     age: true,
// //     education: true,
// //     fatherName: false,
// //     motherName: false,
// //     husbandName: false,
// //     city: true,
// //     profession: true,
// //     description: false,
// //     status: true,
// //     action: true,
// //   });
// //   // const [filter, setFilter] = useState({
// //   //   search: "",
// //   //   type: "",
// //   //   // userType: "",
// //   //   // withCoupon: "",
// //   //   // subType: "",
// //   //   // category: "",
// //   //   // status: "",
// //   //   // topOffers: "",
// //   //   // featuredOffers: "",
// //   // });
// //   const [tempSelectedColumns, setTempSelectedColumns] = useState({
// //     ...selectedColumns,
// //   });
// //   const [memberAnchorEl, setMemberAnchorEl] = useState(null);
// //   const navigate = useNavigate();

// //   const offerType = [
// //     {
// //       name: "Online",
// //       value: "online",
// //     },
// //     {
// //       name: "In-Store",
// //       value: "in-store",
// //     },
// //     {
// //       name: "All",
// //       value: "all",
// //     },
// //     {
// //       name: "Top Offers",
// //       value: "topOffers",
// //     },
// //     {
// //       name: "Featured Offers",
// //       value: "featured",
// //     },
// //     {
// //       name: "In-store Payable",
// //       value: "payable",
// //     },
// //     {
// //       name: "In-store Non-Payable",
// //       value: "non-payable",
// //     },

// //     {
// //       name: "Thrillh-coupon",
// //       value: "true",
// //     },
// //     {
// //       name: "Without-ThrillhCoupon",
// //       value: "false",
// //     },
// //   ];

// //   const OfferStatus = [
// //     {
// //       name: "Active",
// //       value: "active",
// //     },
// //     {
// //       name: "In-Active",
// //       value: "in-active",
// //     },
// //   ];

// //   const userType = [
// //     {
// //       name: "Both",
// //       value: "ALL",
// //     },
// //     {
// //       name: "Student",
// //       value: "STUDENT_ONLY",
// //     },
// //     {
// //       name: "Corporate",
// //       value: "CORPORATE_ONLY",
// //     },
// //   ];

// //   const memberHandleClose = () => {
// //     setMemberAnchorEl(null); // Close the menu
// //   };
// //   const handleSort = () => {
// //     // Implement sorting functionality here
// //     console.log("Sorting members...");
// //     memberHandleClose();
// //   };

// //   const handleFilter = () => {
// //     // Implement filtering functionality here
// //     console.log("Filtering members...");
// //     memberHandleClose();
// //   };

// //   // Pagination states
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 25;
// //   const totalPages = Math.ceil(data.length / itemsPerPage);

// //   const initialWidths = Object.keys(selectedColumns).map(() => 500);
// //   const [columnWidths, setColumnWidths] = useState(initialWidths);

// //   const handleMouseDown = (index) => (e) => {
// //     const startX = e.clientX;
// //     const startWidth = columnWidths[index];

// //     const onMouseMove = (moveEvent) => {
// //       const newWidth = startWidth + (moveEvent.clientX - startX);
// //       setColumnWidths((prev) =>
// //         prev.map((width, i) => (i === index ? Math.max(newWidth, 50) : width))
// //       );
// //     };

// //     const onMouseUp = () => {
// //       document.removeEventListener("mousemove", onMouseMove);
// //       document.removeEventListener("mouseup", onMouseUp);
// //     };

// //     document.addEventListener("mousemove", onMouseMove);
// //     document.addEventListener("mouseup", onMouseUp);
// //   };

// //   const handleSelectAllChange = () => {
// //     const newSelectAll = !selectAll;
// //     setSelectAll(newSelectAll);

// //     // Get current page IDs
// //     const currentDataIds = currentData.map((member) => member.id);

// //     // Update selected rows based on select all action
// //     setSelectedRows(
// //       newSelectAll
// //         ? [...new Set([...selectedRows, ...currentDataIds])]
// //         : selectedRows.filter((id) => !currentDataIds.includes(id))
// //     );
// //   };

// //   const handleSelectAllPagesChange = () => {
// //     alert(
// //       "Action will be applied to all items selected by the filter, including items on other pages"
// //     );
// //     const newSelectAllPages = !selectAllPages;
// //     setSelectAllPages(newSelectAllPages);

// //     // Get all member IDs
// //     const allDataIds = allMembers.map((member) => member.id);
// //     setSelectedRows(newSelectAllPages ? allDataIds : []);
// //   };
// //   const handleSearchChange = (event) => {
// //     const search = event.target.value.toLowerCase(); // Ensure case-insensitive search
// //     setSearchTerm(search);

// //     // Filter all members based on the search term
// //     const filteredData = allMembers?.filter((member) =>
// //       member?.member.toLowerCase().includes(search)
// //     );

// //     setFilteredData(filteredData); // Update filtered data state
// //   };

// //   // Use filtered data if a search term exists, otherwise use paginated data
// //   const currentData = (searchTerm ? filteredData : data)?.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );
// //   // Fetch data based on the current page
// //   useEffect(() => {
// //     const fetchMembers = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:7779/members?page=${currentPage}&limit=${itemsPerPage}`
// //         );
// //         console.log(response?.data);
// //         // setFilteredData(response.data); // Set initial filtered data to the full list
// //         setAllMembers((prevMembers) => [...prevMembers, ...response.data]); // Store all members
// //         setFilteredData(response?.data);
// //         console.log(response?.data, "DATA");
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchMembers();
// //   }, [currentPage, itemsPerPage]);

// //   // const currentData = data.slice(
// //   //   (currentPage - 1) * itemsPerPage,
// //   //   currentPage * itemsPerPage
// //   // ); // Show items only for the current page

// //   const handleSettingsClick = () => {
// //     setTempSelectedColumns({ ...selectedColumns });
// //     setOpenDialog(true);
// //   };

// //   const DialogBoxHandleApply = () => {
// //     setSelectedColumns({ ...tempSelectedColumns });
// //     setOpenDialog(false);
// //   };

// //   const handleApply = () => {
// //     alert(`Selected IDs: ${selectedRows.join(", ")}`);
// //   };

// //   const handleClose = () => setOpenDialog(false);

// //   const deleteHandle = (id) => {
// //     const confirm = window.confirm("Would you like to delete This Row?");
// //     if (confirm) {
// //       axios
// //         .delete(`http://localhost:7779/members/${id}`)
// //         .then(() => {
// //           setData((prevData) => prevData.filter((member) => member.id !== id));
// //           setAllMembers((prev) => prev.filter((member) => member.id !== id)); // Update allMembers
// //         })
// //         .catch((error) => console.log(error));
// //     }
// //   };

// //   const handleMenuClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };
// //   const handleMemberClick = (event) => {
// //     setMemberAnchorEl(event.currentTarget); // Open the menu
// //   };

// //   const handleMenuClose = () => setAnchorEl(null);

// //   const handleEdit = (id) => {
// //     navigate(`/edit/member/${id}`);
// //     handleMenuClose();
// //   };

// //   const handleAdd = () => {
// //     navigate("/add/member");
// //     handleMenuClose();
// //   };

// //   const handleDelete = (id) => {
// //     console.log("Delete member with id:", id);
// //     handleMenuClose();
// //   };
// //   const showBottomButtons = selectedRows.length > 0;
// //   // console.log(filteredData, "dadada");
// //   return (
// //     <Box pt={4} pb={2}>
// //       <Box alignItems={"left"}>{/* <Paper> <SimpleTabs /></Paper> */}</Box>
// //       <Grid container spacing={6}>
// //         <Grid item xs={12}>
// //           <Card sx={{ height: "100%" }}>
// //             <Box
// //               mx={2}
// //               mt={-3}
// //               py={1}
// //               px={2}
// //               variant="gradient"
// //               bgColor="info"
// //               borderRadius="lg"
// //               coloredShadow="info"
// //             >
// //               <Typography variant="h5" color="white">
// //                 Members Table
// //               </Typography>
// //             </Box>
// //             <Box p={2}>
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   m: 1,
// //                 }}
// //               >
// //                 <Typography variant="h5" gutterBottom>
// //                   Members List
// //                 </Typography>
// //                 <Button
// //                   component={Link}
// //                   to="/add/member"
// //                   variant="contained"
// //                   color="success"
// //                   sx={{
// //                     mr: 5,
// //                     color: "#fff",
// //                     bgcolor: "#1976d2",
// //                     "&:hover": { bgcolor: "#115293" },
// //                   }}
// //                 >
// //                   Add +
// //                 </Button>
// //               </Box>

// //               <TableContainer>
// //                 {/* <Box display={"flex"}>
// //                   <Box>
// //                     <MemberSearch
// //                       searchTerm={searchTerm}
// //                       handleSearchChange={handleSearchChange}
// //                     />
// //                   </Box>
// //                   <Box width={"20%"} ml={2}>
// //                     <CustomSelect
// //                       // value={`${filter.status}`}
// //                       placeHolder={"Offer Status"}
// //                       options={OfferStatus}
// //                       borderRadius={"5px"}
// //                       // onChange={(e) => onSelectedOfferStatus(e)}
// //                     />
// //                   </Box>
// //                 </Box> */}
// //                 <Box
// //                   display="flex"
// //                   alignItems="center"
// //                   justifyContent="space-evenly"
// //                   gap={1}
// //                 >
// //                   <Box flex={1} mr={2}>
// //                     <MemberSearch
// //                       searchTerm={searchTerm}
// //                       handleSearchChange={handleSearchChange}
// //                     />
// //                   </Box>
// //                   <Box width="20%" mb={2}>
// //                     <CustomSelect
// //                       placeHolder="Member Status"
// //                       options={OfferStatus}
// //                       borderRadius="5px"
// //                     // onChange={(e) => onSelectedOfferStatus(e)}
// //                     />
// //                   </Box>
// //                   <Box width="20%" mb={2}>
// //                     <CustomSelect
// //                       placeHolder="Member Type"
// //                       options={userType}
// //                       borderRadius="5px"
// //                     // onChange={(e) => onSelectedOfferStatus(e)}
// //                     />
// //                   </Box>
// //                   <Box width="20%" mb={2}>
// //                     <CustomSelect
// //                       placeHolder="Offer Type"
// //                       options={offerType}
// //                       borderRadius="5px"
// //                     // onChange={(e) => onSelectedOfferStatus(e)}
// //                     />
// //                   </Box>
// //                   <Box width="20%" mb={2}>
// //                     <CustomSelect
// //                       placeHolder="Member Status"
// //                       options={OfferStatus}
// //                       borderRadius="5px"
// //                     // onChange={(e) => onSelectedOfferStatus(e)}
// //                     />
// //                   </Box>
// //                 </Box>

// //                 <Table>
// //                   <TableHead>
// //                     <TableRow
// //                       sx={{
// //                         bgcolor: "#e3e1dc",
// //                         height: "50px", // Decrease row height
// //                         "& .MuiTableCell-root": {
// //                           padding: "4px 8px", // Adjust padding
// //                           fontSize: "0.900rem", // Decrease font size
// //                           fontWeight: "bold",
// //                         },
// //                       }}
// //                     >
// //                       <TableCell
// //                         align="center"
// //                         style={{ width: columnWidths[1], position: "relative" }}
// //                       >
// //                         <Box
// //                           display="flex"
// //                           alignItems="center"
// //                           gap={1.8}
// //                         // sx={{ mb: 4 }}
// //                         >
// //                           <Checkbox
// //                             sx={{ ml: 1 }}
// //                             checked={selectAll}
// //                             onChange={handleSelectAllChange}
// //                           />
// //                           <IconButton onClick={handleSettingsClick}>
// //                             <SettingsIcon sx={{ color: "#0d0c0a" }} />
// //                           </IconButton>
// //                         </Box>
// //                         <div
// //                           onMouseDown={handleMouseDown(0)}
// //                           style={{
// //                             cursor: "col-resize",
// //                             position: "absolute",
// //                             right: 0,
// //                             top: 0,
// //                             height: "100%",
// //                             width: "5px",
// //                             zIndex: 1,
// //                           }}
// //                         />
// //                       </TableCell>
// //                       <TableCell
// //                         align="center"
// //                         style={{ width: columnWidths[1], position: "relative" }}
// //                       >
// //                         S.No
// //                         <div
// //                           onMouseDown={handleMouseDown(1)}
// //                           style={{
// //                             cursor: "col-resize",
// //                             position: "absolute",
// //                             right: 0,
// //                             top: 0,
// //                             height: "100%",
// //                             width: "5px",
// //                             zIndex: 1,
// //                           }}
// //                         />
// //                       </TableCell>
// //                       {Object.keys(selectedColumns).map((column, index) =>
// //                         selectedColumns[column] &&
// //                           column !== "sNo" &&
// //                           column !== "status" &&
// //                           column !== "action" ? (
// //                           <TableCell
// //                             key={column}
// //                             align="center"
// //                             style={{
// //                               width: columnWidths[index + 2],
// //                               position: "relative",
// //                               cursor: "pointer",
// //                             }}
// //                             onClick={
// //                               column === "member"
// //                                 ? handleMemberClick
// //                                 : undefined
// //                             } // Add click handler for Member column
// //                           >
// //                             {column.charAt(0).toUpperCase() + column.slice(1)}
// //                             <div
// //                               onMouseDown={handleMouseDown(index + 2)}
// //                               style={{
// //                                 cursor: "col-resize",
// //                                 position: "absolute",
// //                                 right: 0,
// //                                 top: 0,
// //                                 height: "100%",
// //                                 width: "5px",
// //                                 zIndex: 1,
// //                               }}
// //                             />
// //                           </TableCell>
// //                         ) : null
// //                       )}
// //                       <TableCell
// //                         align="center"
// //                         style={{ width: columnWidths[5], position: "relative" }}
// //                       >
// //                         Status
// //                         <div
// //                           onMouseDown={handleMouseDown(5)}
// //                           style={{
// //                             cursor: "col-resize",
// //                             position: "absolute",
// //                             right: 0,
// //                             top: 0,
// //                             height: "100%",
// //                             width: "5px",
// //                             zIndex: 1,
// //                           }}
// //                         />
// //                       </TableCell>
// //                       <TableCell
// //                         align="center"
// //                         style={{ width: columnWidths[6], position: "relative" }}
// //                       >
// //                         Actions
// //                         <div
// //                           onMouseDown={handleMouseDown(6)}
// //                           style={{
// //                             cursor: "col-resize",
// //                             position: "absolute",
// //                             right: 0,
// //                             top: 0,
// //                             height: "100%",
// //                             width: "5px",
// //                             zIndex: 1,
// //                           }}
// //                         />
// //                       </TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {filteredData.map((member, index) => (
// //                       <TableRow key={member.id}>
// //                         <TableCell align="center">
// //                           <Box display="flex" alignItems="center" gap={2}>
// //                             <Checkbox
// //                               checked={selectedRows.includes(member.id)}
// //                               onChange={() => {
// //                                 setSelectedRows((prev) =>
// //                                   prev.includes(member.id)
// //                                     ? prev.filter((id) => id !== member.id)
// //                                     : [...prev, member.id]
// //                                 );
// //                               }}
// //                             />
// //                             <IconButton onClick={handleMenuClick}>
// //                               <MenuIcon />
// //                             </IconButton>
// //                             <Menu
// //                               anchorEl={anchorEl}
// //                               open={Boolean(anchorEl)}
// //                               onClose={handleMenuClose}
// //                               anchorOrigin={{
// //                                 vertical: "bottom",
// //                                 horizontal: "center",
// //                               }}
// //                               transformOrigin={{
// //                                 vertical: "top",
// //                                 horizontal: "center",
// //                               }}
// //                             >
// //                               <MenuItem onClick={() => handleAdd()}>
// //                                 Add
// //                               </MenuItem>
// //                               <MenuItem onClick={() => handleEdit(member.id)}>
// //                                 Edit
// //                               </MenuItem>
// //                               <MenuItem onClick={() => handleDelete(member.id)}>
// //                                 Delete
// //                               </MenuItem>
// //                             </Menu>
// //                           </Box>
// //                         </TableCell>
// //                         <TableCell align="center">
// //                           {index + 1 + (currentPage - 1) * itemsPerPage}
// //                         </TableCell>
// //                         {Object.keys(selectedColumns).map((column, colIndex) =>
// //                           selectedColumns[column] &&
// //                             column !== "sNo" &&
// //                             column !== "status" &&
// //                             column !== "action" ? (
// //                             <TableCell
// //                               key={column}
// //                               align="center"
// //                               style={{ width: columnWidths[colIndex + 2] }}
// //                             >
// //                               {member[column]}
// //                             </TableCell>
// //                           ) : null
// //                         )}
// //                         <TableCell align="center">
// //                           {member.isEnabled ? "Enabled" : "Disabled"}
// //                         </TableCell>
// //                         <TableCell align="center" sx={{ minWidth: 250 }}>
// //                           <Button
// //                             sx={{
// //                               color: "#fff",
// //                               mr: 1,
// //                               bgcolor: "#0288d1",
// //                               "&:hover": { bgcolor: "#01579b" },
// //                             }}
// //                             component={Link}
// //                             to={`/edit/member/${member.id}`}
// //                           >
// //                             Edit
// //                           </Button>
// //                           <Button
// //                             sx={{
// //                               color: "#ffff",
// //                               bgcolor: "#d32f2f",
// //                               "&:hover": { bgcolor: "#9a0007" },
// //                             }}
// //                             onClick={() => deleteHandle(member.id)}
// //                           >
// //                             Delete
// //                           </Button>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>

// //                   <Menu
// //                     anchorEl={memberAnchorEl}
// //                     open={Boolean(memberAnchorEl)}
// //                     onClose={memberHandleClose}
// //                     anchorOrigin={{
// //                       vertical: "bottom",
// //                       horizontal: "center",
// //                     }}
// //                     transformOrigin={{
// //                       vertical: "top",
// //                       horizontal: "center",
// //                     }}
// //                   >
// //                     <MenuItem onClick={handleSort}>Sort Members</MenuItem>
// //                     <MenuItem onClick={handleFilter}>Filter Members</MenuItem>
// //                   </Menu>
// //                 </Table>
// //                 <Pagination
// //                   currentPage={currentPage}
// //                   totalPages={totalPages}
// //                   onPageChange={setCurrentPage}
// //                   onChange={(_, page) => setCurrentPage(page)}
// //                 />
// //               </TableContainer>
// //             </Box>

// //             {showBottomButtons && ( // Conditional rendering
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   p: 1,
// //                   gap: 2,
// //                   bgcolor: "#ebeae8",
// //                   position: "fixed",
// //                   bottom: 25,
// //                   right: 30,
// //                   borderRadius: 2,
// //                   width: "81.5%",
// //                 }}
// //               >
// //                 <Button
// //                   sx={{
// //                     mt: 1,
// //                     color: "#0d0c0a",
// //                     height: "40px",
// //                     width: "100px",
// //                     // bgcolor: "#0288d1",
// //                     "&:hover": {
// //                       bgcolor: "#01579b",
// //                       color: "#ffff",
// //                     },
// //                   }}
// //                   variant="outlined"
// //                   onClick={handleApply}
// //                 >
// //                   Apply
// //                 </Button>

// //                 <Button
// //                   sx={{
// //                     mt: 1,
// //                     color: "#0d0c0a",
// //                     height: "40px",
// //                     width: "100px",
// //                     // bgcolor: "#0288d1",
// //                     "&:hover": {
// //                       bgcolor: "#01579b",
// //                       color: "#ffff",
// //                     },
// //                   }}
// //                   variant="outlined"
// //                   onClick={() => setSelectedRows([])}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Box>
// //                   <TableBottomDropdown
// //                     onFilter={handleFilter}
// //                     onSort={handleSort}
// //                   />
// //                 </Box>
// //                 <Box display={"flex"}>
// //                   <Checkbox
// //                     sx={{ mt: 1 }}
// //                     checked={selectAllPages}
// //                     onChange={handleSelectAllPagesChange}
// //                   />
// //                   <Typography mt={2}>For All</Typography>
// //                 </Box>
// //               </Box>
// //             )}
// //           </Card>
// //         </Grid>
// //       </Grid>
// //       <DialogBox
// //         open={openDialog}
// //         onClose={handleClose}
// //         selectedColumns={selectedColumns}
// //         tempSelectedColumns={tempSelectedColumns}
// //         setTempSelectedColumns={setTempSelectedColumns}
// //         onApply={DialogBoxHandleApply}
// //       />
// //     </Box>
// //   );
// // };

// // export default MembersTable2;

// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   Card,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// // } from "@mui/material";
// // import FolderIcon from "@mui/icons-material/Folder";
// // import ShieldIcon from "@mui/icons-material/Shield";
// // import SearchIcon from "@mui/icons-material/Search";
// // import AddIcon from "@mui/icons-material/Add";
// // import MembersTable from "./table-plugins1";

// // function ContactsListWithFolders() {
// //   const [folders, setFolders] = useState(["My First Folder", "Folder 1"]);
// //   const [open, setOpen] = useState(false);
// //   const [newFolderName, setNewFolderName] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedFolder, setSelectedFolder] = useState(null);

// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => {
// //     setOpen(false);
// //     setNewFolderName("");
// //   };

// //   const handleAddFolder = () => {
// //     if (newFolderName.trim()) {
// //       setFolders([...folders, newFolderName.trim()]);
// //       handleClose();
// //     }
// //   };

// //   const handleFolderClick = (folder) => {
// //     setSelectedFolder(folder);
// //   };

// //   const filteredFolders = folders.filter((folder) =>
// //     folder.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <Box>
// //       <Card>
// //         {/* Search Bar */}
// //         <Box display="flex" alignItems="center" mb={2} p={2}>
// //           <SearchIcon />
// //           <TextField
// //             placeholder="Search"
// //             variant="outlined"
// //             size="small"
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             sx={{ ml: 1 }}
// //           />
// //         </Box>

// //         {/* Add Folder Button */}
// //         <Box p={2}>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<AddIcon />}
// //             onClick={handleOpen}
// //           >
// //             New Folder
// //           </Button>
// //         </Box>

// //         {/* Folder Creation Dialog */}
// //         <Dialog open={open} onClose={handleClose}>
// //           <DialogTitle>Create New Folder</DialogTitle>
// //           <DialogContent>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               label="Folder Name"
// //               type="text"
// //               fullWidth
// //               value={newFolderName}
// //               onChange={(e) => setNewFolderName(e.target.value)}
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={handleClose} color="secondary">
// //               Cancel
// //             </Button>
// //             <Button onClick={handleAddFolder} color="primary">
// //               Create
// //             </Button>
// //           </DialogActions>
// //         </Dialog>

// //         {/* Folder List */}
// //         <List>
// //           {filteredFolders.map((folder, index) => (
// //             <ListItem
// //               key={index}
// //               button
// //               onClick={() => handleFolderClick(folder)}
// //             >
// //               <ListItemIcon>
// //                 {index === 0 ? <ShieldIcon /> : <FolderIcon />}
// //               </ListItemIcon>
// //               <ListItemText primary={folder} />
// //             </ListItem>
// //           ))}
// //         </List>

// //         {/* Conditional Table Rendering */}
// //         {selectedFolder === "Folder 1" && (
// //           <Box p={2}>

// //             <MembersTable />
// //           </Box>
// //         )}
// //       </Card>
// //     </Box>
// //   );
// // }

// // export default ContactsListWithFolders;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Grid,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ShieldIcon from "@mui/icons-material/Shield";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu"; // For mobile drawer
import MembersTable from "./table-plugins1"; // Assuming this is your existing MembersTable component

function ContactsListWithFolders() {
  const [folders, setFolders] = useState(["My First Folder"]);
  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Mobile drawer state

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewFolderName("");
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, newFolderName.trim()]);
      handleClose();
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const filteredFolders = folders.filter((folder) =>
    folder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <Card>
        {/* Dialog for Adding a Folder */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Folder Name"
              type="text"
              fullWidth
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddFolder} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Drawer for Mobile View */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <Box p={2}>
            {/* Search and New Folder button inside Drawer */}
            <Box display="flex" alignItems="center" mb={2}>
              <SearchIcon />
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ ml: 1, width: "100%" }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpen}
              sx={{ mb: 2, width: "100%" }}
            >
              New Folder
            </Button>

            <List>
              {filteredFolders.map((folder, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleFolderClick(folder)}
                >
                  <ListItemIcon>
                    {index === 0 ? <ShieldIcon /> : <FolderIcon />}
                  </ListItemIcon>
                  <ListItemText primary={folder} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Grid Layout */}
        <Grid container spacing={2}>
          {/* Folders on the Left (on larger screens) */}
          <Grid
            item
            xs={12}
            md={2.6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box borderRight="1px solid #ddd" p={2}>
              <Typography variant="h6" m={1} ml={2}>
                List of Tables
              </Typography>
              {/* Search and New Folder button inside Left Sidebar */}
              <Box display="flex" alignItems="center" mb={2} mt={1.5}>
                <SearchIcon />
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ ml: 1, width: "100%" }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ mb: 1.5, mt: 2, width: "100%" }}
              >
                New Folder
              </Button>
              <hr></hr>
              <List>
                {filteredFolders.map((folder, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleFolderClick(folder)}
                  >
                    <ListItemIcon>
                      {index === 0 ? <FolderIcon /> : <FolderIcon />}
                    </ListItemIcon>
                    <ListItemText primary={folder} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Table on the Right */}
          <Grid item xs={12} md={9.4}>
            {selectedFolder && (
              <Box>
                <Typography variant="h6" m={0.5} ml={4}>
                  {selectedFolder}
                </Typography>
                <MembersTable />
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default ContactsListWithFolders;
