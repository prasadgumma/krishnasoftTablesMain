import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";

export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "member",
    headerName: "Member",
    filterable: true,
    width: 150,
  },
  // CreatedAtColumn({ field: "createdAt" }),
  {
    field: "age",
    type: "number",
    headerName: "Age",
    width: 90,

    sortable: true,
  },
  {
    field: "education",
    headerName: "Education",
    width: 130,
  },
  {
    field: "fatherName",
    headerName: "Father's Name",
    width: 150,
  },
  {
    field: "motherName",
    headerName: "Mother's Name",
    width: 150,
  },
  {
    field: "husbandName",
    headerName: "Husband's Name",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "profession",
    headerName: "Profession",
    width: 130,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,

    renderCell: (params) => (params.row.isEnabled ? "Enabled" : "Disabled"),
  },
  {
    field: "action",
    headerName: "Actions",
    width: 150,
  },
];

const TableDropdown = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [secondDropdownVisible, setSecondDropdownVisible] = useState(false);
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // Open Google when "Item 1" or "Item 3" is selected
    if (value === "id" || value === "Item 3") {
      window.open("https://www.google.com", "_blank"); // Open in a new tab
    }

    // Show second dropdown when "Item 1" is selected
    if (value === "member") {
      setSecondDropdownVisible(true);
    } else {
      setSecondDropdownVisible(false); // Hide it if another item is selected
    }
  };

  const handleSecondDropdownChange = (event) => {
    const value = event.target.value;
    setSecondDropdownValue(event.target.value);
    // You can handle the selected value of the second dropdown here
    console.log("Second dropdown value:", event.target.value);
    if (value === "Sub-item 1" || value === "Sub-item 2") {
      window.open("https://www.google.com", "_blank"); // Open in a new tab
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
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
            {/* {[...Array(10)].map((_, index) => (
              <MenuItem key={index} value={`Item ${index + 1}`}>
                Item {index + 1}
              </MenuItem>
            ))} */}
            {columns.map((column, index) => (
              <MenuItem key={index} value={column.field}>
                {column.headerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Conditionally render second dropdown if Item 1 is selected */}
      {secondDropdownVisible && (
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ minWidth: 150, mt: 1 }}
            size="small"
          >
            <InputLabel id="second-dropdown-label" sx={{ color: "#ffff" }}>
              Select Sub-action
            </InputLabel>
            <Select
              labelId="second-dropdown-label"
              value={secondDropdownValue}
              onChange={handleSecondDropdownChange}
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
              label="Select Sub-item"
            >
              {[...Array(5)].map((_, index) => (
                <MenuItem key={index} value={`Sub-item ${index + 1}`}>
                  Sub-item {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default TableDropdown;
