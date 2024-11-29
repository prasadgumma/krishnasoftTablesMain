
import React, { useState } from "react";
import {
  FormControl,
  Box,
  Popover,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ProfessionFilterComponent = ({
  handleProfessionSelect,
  handleClearSelection,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState("");

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfessionClick = (profession) => {
    setSelectedProfession(profession); // Update selected profession
    handleProfessionSelect(profession); // Notify parent about the selected profession
    // handleClose(); // Close the popover
  };

  const handleClear = () => {
    setSelectedProfession(""); // Reset the selected profession
    handleClearSelection(); // Refresh the data or reset the filter
  };

  const open = Boolean(anchorEl);
  const id = open ? "profession-filter-popover" : undefined;

  const professions = [
    "Scientist",
    "Entrepreneur",
    "Manager",
    "Teacher",
    "Developer",
    "Nurse",
    "Professor",
    "Consultant",
    "Sales Executive",
    "Intern",
    "Software Engineer",
    "Accountant",
    "HR Manager",
    "Mathematician",
    "Historian",
    "Veterinarian",
  ]; // Replace with dynamic data if needed

  return (
    <FormControl sx={{ width: "13%" }}>
      <Box
        sx={{
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#e3e4e6",
          padding: "0 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <Typography color="#888">
          {selectedProfession || "Select Profession"}
        </Typography>
        {selectedProfession && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening the popover
              handleClear();
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, minWidth: "200px" }}>
          {professions.map((profession) => (
            <React.Fragment key={profession}>
              <Box
                sx={{
                  cursor: "pointer",
                  padding: "4px",
                  fontSize: "15px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={() => handleProfessionClick(profession)}
              >
                {profession}
              </Box>
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      </Popover>
    </FormControl>
  );
};

export default ProfessionFilterComponent;
