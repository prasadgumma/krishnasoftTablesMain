// import React from "react";

// const UpdatedAtColumn = ({ field }) => {
//   return {
//     field: field,
//     headerName: "Updated At",
//     width: 180,
//     type: "date",
//     valueGetter: (params) => {
//       // Safely return a Date object or null
//       return params.value ? new Date(params.value) : null;
//     },
//     renderCell: (params) => {
//       const updatedAtDate = params.value; // This will be a Date object or null
//       return updatedAtDate
//         ? updatedAtDate.toLocaleString() // Format as a readable string
//         : "Not Updated"; // Default for null/undefined values
//     },
//     sortable: true, // Enable sorting
//   };
// };

// export default UpdatedAtColumn;

const UpdatedAtColumn = ({ field }) => {
  return {
    field: field,
    headerName: "Updated At",
    width: 180,
    type: "date",
    valueGetter: (params) => {
      const value = params.row?.[field];
      return value ? new Date(value) : null; // Return a Date object or null
    },
    renderCell: (params) => {
      const updatedAtDate = params.value;
      return updatedAtDate
        ? updatedAtDate.toLocaleString() // Format date
        : "Not Updated"; // Handle null values
    },
    sortable: true,
  };
};

export default UpdatedAtColumn;
