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
