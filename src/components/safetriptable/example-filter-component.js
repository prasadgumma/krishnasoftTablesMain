import React from "react";
import { Grid, TextField, MenuItem, IconButton, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
const FilterExampleComponent = ({ filters, setFilters }) => {
  const fields = [
    { value: "member", label: "Member" },
    { value: "fatherName", label: "Father Name" },
    { value: "city", label: "City" },
  ];

  const conditions = [
    { value: "Is", label: "Is" },
    { value: "IsNot", label: "Is not" },
    { value: "IsBlank", label: "Is blank" },
    { value: "IsNotBlank", label: "Is not blank" },
  ];

  const handleFilterChange = (index, key, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index][key] = value;
    setFilters(updatedFilters);
  };

  const addFilter = () => {
    setFilters((prev) => [...prev, { field: "", condition: "Is", value: "" }]);
  };

  const removeFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Grid container spacing={2}>
      {filters.map((filter, index) => (
        <React.Fragment key={index}>
          <Grid item xs={1}>
            <IconButton
              color="error"
              onClick={() => removeFilter(index)}
              disabled={filters.length === 1}
            >
              <RemoveIcon color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <TextField
              select
              label="Field"
              fullWidth
              value={filter.field}
              onChange={(e) =>
                handleFilterChange(index, "field", e.target.value)
              }
            >
              {fields.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              select
              label="Condition"
              fullWidth
              value={filter.condition}
              onChange={(e) =>
                handleFilterChange(index, "condition", e.target.value)
              }
            >
              {conditions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            {filter.condition !== "IsBlank" &&
            filter.condition !== "IsNotBlank" ? (
              <TextField
                label="Value"
                fullWidth
                value={filter.value}
                onChange={(e) =>
                  handleFilterChange(index, "value", e.target.value)
                }
              />
            ) : (
              <TextField disabled label="N/A" fullWidth />
            )}
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <Button variant="outlined" startIcon={<Add />} onClick={addFilter}>
          Add Another Field
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterExampleComponent;
