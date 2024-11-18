import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TableDropdown = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // Open Google when "Item 1" is selected
    if (value === "Item 1") {
      window.open("https://www.google.com", "_blank"); // Open in a new tab
    }
    if (value === "Item 2") {
      window.open(
        "https://www.bitrix24.in/?utm_source=google&utm_medium=cpc&utm_campaign=21491771738-168767185167&gad_source=1&gclid=Cj0KCQjwvpy5BhDTARIsAHSilymBI2Cbrna0PVtD_TTIM4Xfyxrll6yS0GD5E8Yu1_2y0rJBvplnznMaApvHEALw_wcB",
        "_blank"
      ); // Open in a new tab
    }
    if (value === "Item 3") {
      window.open("https://www.google.com", "_blank"); // Open in a new tab
    }
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ minWidth: 150, mt: 1 }}
      size="small"
    >
      <InputLabel id="dropdown-label" sx={{ color: "#ffff" }}>
        Select Action
      </InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedValue}
        onChange={handleChange}
        // sx={{ maxHeight: 100, color: "#ffff" }}
        sx={{
          height: "2.3rem",
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        label="Select Item"
      >
        {[...Array(10)].map((_, index) => (
          <MenuItem key={index} value={`Item ${index + 1}`}>
            Item {index + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TableDropdown;

// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Checkbox,
//   IconButton,
//   Box,
//   Menu,
//   MenuItem,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MembersTable = () => {
//   const [data, setData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectAllPages, setSelectAllPages] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [allMembers, setAllMembers] = useState([]);

//   const [selectedColumns, setSelectedColumns] = useState({
//     id: false,
//     sNo: true,
//     member: true,
//     age: true,
//     education: true,
//     fatherName: false,
//     motherName: false,
//     husbandName: false,
//     city: true,
//     profession: true,
//     description: false,
//     status: true,
//     action: true,
//   });
//   const [tempSelectedColumns, setTempSelectedColumns] = useState({
//     ...selectedColumns,
//   });

//   const navigate = useNavigate();

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 25;
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const initialWidths = Object.keys(selectedColumns).map(() => 500);
//   const [columnWidths, setColumnWidths] = useState(initialWidths);

//   const handleMouseDown = (index) => (e) => {
//     const startX = e.clientX;
//     const startWidth = columnWidths[index];

//     const onMouseMove = (moveEvent) => {
//       const newWidth = startWidth + (moveEvent.clientX - startX);
//       setColumnWidths((prev) =>
//         prev.map((width, i) => (i === index ? Math.max(newWidth, 50) : width))
//       );
//     };

//     const onMouseUp = () => {
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     };

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//   };

//   const handleSelectAllChange = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);

//     const currentDataIds = currentData.map((member) => member.id);
//     setSelectedRows(
//       newSelectAll
//         ? [...new Set([...selectedRows, ...currentDataIds])]
//         : selectedRows.filter((id) => !currentDataIds.includes(id))
//     );
//   };

//   const handleSelectAllPagesChange = () => {
//     alert(
//       'Action will be applied to all items selected by the filter, including items on other pages'
//     );
//     const newSelectAllPages = !selectAllPages;
//     setSelectAllPages(newSelectAllPages);

//     const allDataIds = allMembers.map((member) => member.id);
//     setSelectedRows(newSelectAllPages ? allDataIds : []);
//   };

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:7777/members?page=${currentPage}&limit=${itemsPerPage}`
//         );
//         setData(response.data);
//         setAllMembers((prevMembers) => [...prevMembers, ...response.data]);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMembers();
//   }, [currentPage]);

//   const currentData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSettingsClick = () => {
//     setTempSelectedColumns({ ...selectedColumns });
//     setOpenDialog(true);
//   };

//   const DialogBoxHandleApply = () => {
//     setSelectedColumns({ ...tempSelectedColumns });
//     setOpenDialog(false);
//   };

//   const handleClose = () => setOpenDialog(false);

//   const deleteHandle = (id) => {
//     const confirm = window.confirm('Would you like to delete This Row?');
//     if (confirm) {
//       axios
//         .delete(`http://localhost:7777/members/${id}`)
//         .then(() => {
//           setData((prevData) => prevData.filter((member) => member.id !== id));
//           setAllMembers((prev) => prev.filter((member) => member.id !== id));
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => setAnchorEl(null);

//   const handleEdit = (id) => {
//     navigate(`/edit/member/${id}`);
//     handleMenuClose();
//   };

//   const handleAdd = () => {
//     navigate('/add/member');
//     handleMenuClose();
//   };

//   const handleSort = (order) => {
//     const sortedData = [...currentData].sort((a, b) => {
//       return order === 'asc'
//         ? a.member.localeCompare(b.member)
//         : b.member.localeCompare(a.member);
//     });
//     setData(sortedData);
//     setAnchorEl(null); // Close the menu after sorting
//   };

//   const [isMemberOptionsOpen, setIsMemberOptionsOpen] = useState(false);

//   const handleMemberHeaderClick = () => {
//     setIsMemberOptionsOpen((prev) => !prev);
//   };

//   return (
//     <Table>
//       <TableHead>
//         <TableRow
//           sx={{
//             bgcolor: '#e3e1dc',
//             height: '40px',
//             '& .MuiTableCell-root': {
//               padding: '4px 8px',
//               fontSize: '0.875rem',
//             },
//           }}
//         >
//           <TableCell align="center" style={{ width: columnWidths[0], position: 'relative' }}>
//             <Box display="flex" alignItems="center" gap={1.8}>
//               <Checkbox
//                 sx={{ ml: 1 }}
//                 checked={selectAll}
//                 onChange={handleSelectAllChange}
//               />
//               <IconButton onClick={handleSettingsClick}>
//                 <SettingsIcon sx={{ color: '#0d0c0a' }} />
//               </IconButton>
//             </Box>
//             <div
//               onMouseDown={handleMouseDown(0)}
//               style={{
//                 cursor: 'col-resize',
//                 position: 'absolute',
//                 right: 0,
//                 top: 0,
//                 height: '100%',
//                 width: '5px',
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//           <TableCell align="center" style={{ width: columnWidths[1], position: 'relative' }}>
//             S.No
//             <div
//               onMouseDown={handleMouseDown(1)}
//               style={{
//                 cursor: 'col-resize',
//                 position: 'absolute',
//                 right: 0,
//                 top: 0,
//                 height: '100%',
//                 width: '5px',
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//           <TableCell
//             align="center"
//             style={{ width: columnWidths[2], position: 'relative' }}
//             onClick={handleMemberHeaderClick}
//           >
//             Member
//             {isMemberOptionsOpen && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   backgroundColor: 'white',
//                   boxShadow: 2,
//                   zIndex: 10,
//                   marginTop: 1,
//                 }}
//               >
//                 <MenuItem onClick={() => handleSort('asc')}>Sort Ascending</MenuItem>
//                 <MenuItem onClick={() => handleSort('desc')}>Sort Descending</MenuItem>
//               </Box>
//             )}
//             <div
//               onMouseDown={handleMouseDown(2)}
//               style={{
//                 cursor: 'col-resize',
//                 position: 'absolute',
//                 right: 0,
//                 top: 0,
//                 height: '100%',
//                 width: '5px',
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//           {/* Repeat similar structure for other columns */}
//           <TableCell align="center" style={{ width: columnWidths[3], position: 'relative' }}>
//             Age
//             <div
//               onMouseDown={handleMouseDown(3)}
//               style={{
//                 cursor: 'col-resize',
//                 position: 'absolute',
//                 right: 0,
//                 top: 0,
//                 height: '100%',
//                 width: '5px',
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//           {/* Add more cells as needed */}
//           <TableCell align="center" style={{ width: columnWidths[4], position: 'relative' }}>
//             Status
//             <div
//               onMouseDown={handleMouseDown(4)}
//               style={{
//                 cursor: 'col-resize',
//                 position: 'absolute',
//                 right: 0,
//                 top: 0,
//                 height: '100%',
//                 width: '5px',
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//           <TableCell align="center" style={{ width: columnWidths[5], position: 'relative' }}>
//             Actions
//             <div
//               onMouseDown={handleMouseDown(5)}
//               style={{
//                 cursor: 'col-resize',
//                 position: 'absolute',
//                 right: 0,
//                 top: 0,
//                 height: '100%',
//                 width: '5px',
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {currentData.map((member, index) => (
//           <TableRow key={member.id}>
//             <TableCell>
//               <Checkbox
//                 checked={selectedRows.includes(member.id)}
//                 onChange={() => {
//                   const newSelected = selectedRows.includes(member.id)
//                     ? selectedRows.filter((id) => id !== member.id)
//                     : [...selectedRows, member.id];
//                   setSelectedRows(newSelected);
//                 }}
//               />
//             </TableCell>
//             <TableCell>{index + 1}</TableCell>
//             <TableCell>{member.name}</TableCell>
//             <TableCell>{member.age}</TableCell>
//             <TableCell>{member.status}</TableCell>
//             <TableCell>
//               <IconButton onClick={handleMenuClick}>
//                 {/* Your menu icon here */}
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//               >
//                 <MenuItem onClick={() => handleEdit(member.id)}>Edit</MenuItem>
//                 <MenuItem onClick={() => deleteHandle(member.id)}>Delete</MenuItem>
//               </Menu>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       {/* Bottom buttons or other components as necessary */}
//       {selectedRows.length > 0 && (
//         <Box>
//           <Button onClick={handleApply}>Apply to Selected</Button>
//         </Box>
//       )}
//       {/* Dialog for settings */}
//       <Dialog open={openDialog} onClose={handleClose}>
//         <DialogTitle>Settings</DialogTitle>
//         <DialogContent>
//           {/* Your settings content here */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={DialogBoxHandleApply}>Apply</Button>
//           <Button onClick={handleClose}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </Table>
//   );
// };

// export default MembersTable;
