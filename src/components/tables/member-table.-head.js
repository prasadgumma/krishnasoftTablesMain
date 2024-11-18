// // MembersTableHead.js
// import React from "react";
// import { TableCell, TableRow, Checkbox, IconButton } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";

// const MembersTableHead = ({
//   columnWidths,
//   selectAll,
//   onSelectAllChange,
//   onSettingsClick,
//   selectedColumns,
//   handleMouseDown,
// }) => {
//   return (
//     <TableRow
//       sx={{
//         bgcolor: "#e3e1dc",
//         height: "40px",
//         "& .MuiTableCell-root": {
//           padding: "4px 8px",
//           fontSize: "0.875rem",
//         },
//       }}
//     >
//       <TableCell
//         align="center"
//         style={{ width: columnWidths[0], position: "relative" }}
//       >
//         <Checkbox
//           sx={{ ml: 1 }}
//           checked={selectAll}
//           onChange={onSelectAllChange}
//         />
//         <IconButton onClick={onSettingsClick}>
//           <SettingsIcon sx={{ color: "#0d0c0a" }} />
//         </IconButton>
//         <div
//           onMouseDown={handleMouseDown(0)}
//           style={{
//             cursor: "col-resize",
//             position: "absolute",
//             right: 0,
//             top: 0,
//             height: "100%",
//             width: "5px",
//             zIndex: 1,
//           }}
//         />
//       </TableCell>
//       <TableCell
//         align="center"
//         style={{ width: columnWidths[1], position: "relative" }}
//       >
//         S.No
//         <div
//           onMouseDown={handleMouseDown(1)}
//           style={{
//             cursor: "col-resize",
//             position: "absolute",
//             right: 0,
//             top: 0,
//             height: "100%",
//             width: "5px",
//             zIndex: 1,
//           }}
//         />
//       </TableCell>
//       {Object.keys(selectedColumns).map((column, index) =>
//         selectedColumns[column] &&
//         column !== "sNo" &&
//         column !== "status" &&
//         column !== "action" ? (
//           <TableCell
//             key={column}
//             align="center"
//             style={{ width: columnWidths[index + 2], position: "relative" }}
//           >
//             {column.charAt(0).toUpperCase() + column.slice(1)}
//             <div
//               onMouseDown={handleMouseDown(index + 2)}
//               style={{
//                 cursor: "col-resize",
//                 position: "absolute",
//                 right: 0,
//                 top: 0,
//                 height: "100%",
//                 width: "5px",
//                 zIndex: 1,
//               }}
//             />
//           </TableCell>
//         ) : null
//       )}
//       <TableCell
//         align="center"
//         style={{ width: columnWidths[5], position: "relative" }}
//       >
//         Status
//         <div
//           onMouseDown={handleMouseDown(5)}
//           style={{
//             cursor: "col-resize",
//             position: "absolute",
//             right: 0,
//             top: 0,
//             height: "100%",
//             width: "5px",
//             zIndex: 1,
//           }}
//         />
//       </TableCell>
//       <TableCell
//         align="center"
//         style={{ width: columnWidths[6], position: "relative" }}
//       >
//         Actions
//         <div
//           onMouseDown={handleMouseDown(6)}
//           style={{
//             cursor: "col-resize",
//             position: "absolute",
//             right: 0,
//             top: 0,
//             height: "100%",
//             width: "5px",
//             zIndex: 1,
//           }}
//         />
//       </TableCell>
//     </TableRow>
//   );
// };

// export default MembersTableHead;
