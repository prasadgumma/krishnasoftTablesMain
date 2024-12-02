import React, { useState } from "react";
import {
  FormControl,
  Box,
  Popover,
  Typography,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const FilterComponent = ({
  handleCitySelect,
  handleProfessionSelect,
  handleClearCitySelection,
  handleClearProfessionSelection,
}) => {
  const [cityAnchorEl, setCityAnchorEl] = useState(null);
  const [professionAnchorEl, setProfessionAnchorEl] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");

  const openCityPopover = (event) => setCityAnchorEl(event.currentTarget);
  const closeCityPopover = () => setCityAnchorEl(null);

  const openProfessionPopover = (event) =>
    setProfessionAnchorEl(event.currentTarget);
  const closeProfessionPopover = () => setProfessionAnchorEl(null);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    handleCitySelect(city);
    closeCityPopover();
  };

  const handleProfessionClick = (profession) => {
    setSelectedProfession(profession);
    handleProfessionSelect(profession);
    closeProfessionPopover();
  };

  const clearCitySelection = (e) => {
    e.stopPropagation();
    setSelectedCity("");
    handleClearCitySelection();
  };

  const clearProfessionSelection = (e) => {
    e.stopPropagation();
    setSelectedProfession("");
    handleClearProfessionSelection();
  };

  const cities = [
    "Dallas",
    "Las Vegas",
    "San Diego",
    "San Francisco",
    "Chicago",
    "Philadelphia",
    "Charlotte",
    "Baltimore",
    "Long Beach",
    "St. Louis",
    "New York",
    "Los Angeles",
    "Indianapolis",
    "Denver",
    "Tucson",
    "Vinukonda",
  ];

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
  ];

  return (
    <Grid container spacing={2}>
      {/* City Filter */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Box
            sx={{
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#e3e4e6",
              padding: "0 10px",
              borderRadius: "4px",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={openCityPopover}
          >
            <Typography color="#888">
              {selectedCity || "Select City"}
            </Typography>
            {selectedCity && (
              <IconButton size="small" onClick={clearCitySelection}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Popover
            id="city-filter-popover"
            open={Boolean(cityAnchorEl)}
            anchorEl={cityAnchorEl}
            // onClose={closeCityPopover}
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
              {cities.map((city) => (
                <React.Fragment key={city}>
                  <Box
                    sx={{
                      cursor: "pointer",
                      padding: "4px",
                      fontSize: "15px",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                    onClick={() => handleCityClick(city)}
                  >
                    {city}
                  </Box>
                  <Divider />
                </React.Fragment>
              ))}
            </Box>
          </Popover>
        </FormControl>
      </Grid>

      {/* Profession Filter */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
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
            onClick={openProfessionPopover}
          >
            <Typography color="#888">
              {selectedProfession || "Select Profession"}
            </Typography>
            {selectedProfession && (
              <IconButton size="small" onClick={clearProfessionSelection}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Popover
            id="profession-filter-popover"
            open={Boolean(professionAnchorEl)}
            anchorEl={professionAnchorEl}
            onClose={closeProfessionPopover}
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
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
