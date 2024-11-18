const CreatedAtColumn = ({ field }) => {
  return {
    field: field,
    headerName: "Created At",
    width: 180,
    renderCell: (params) => {
      const createdAtDate = new Date(params.value);
      return createdAtDate.toLocaleString(); // Format the date to a readable string
    },
    sortable: true, // Enable sorting for this column
  };
};

export default CreatedAtColumn;

// const CreatedAtColumn = ({ field }) => {
//   return {
//     field: field,
//     headerName: "Created At",
//     type: "dateTime", // Specify the column type as 'dateTime'
//     width: 180,
//     valueGetter: (params) => {
//       const rawValue = params.value;
//       if (!rawValue) return null; // Handle empty or undefined values
//       const parsedDate = new Date(rawValue);
//       return isNaN(parsedDate.getTime()) ? null : parsedDate; // Return null if invalid
//     },
//     renderCell: (params) => {
//       const createdAtDate = params.value;
//       if (!createdAtDate) return "N/A"; // Fallback for empty or invalid dates
//       return createdAtDate.toLocaleString(); // Format the date to a readable string
//     },
//     sortable: true, // Enable sorting for this column
//   };
// };

// export default CreatedAtColumn;
