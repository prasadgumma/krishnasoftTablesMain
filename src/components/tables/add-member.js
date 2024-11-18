import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation after adding a member

const AddMember = () => {
  const navigate = useNavigate();

  // State to manage form fields
  const [formData, setFormData] = useState({
    member: "",
    age: "",
    education: "",
    fatherName: "",
    motherName: "",
    city: "",
    profession: "",
    description: "",
    status: "Enabled", // Default status
  });

  // State for error handling and success messages
  const [errorMessages, setErrorMessages] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.member) errors.member = "Name is required.";
    if (!formData.age || isNaN(formData.age))
      errors.age = "Valid age is required.";
    if (!formData.education) errors.education = "Education is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.profession) errors.profession = "Profession is required.";
    setErrorMessages(errors);
    return Object.keys(errors).length === 0; // If there are no errors, return true
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    try {
      // Submit the form data to the server
      const response = await axios.post(
        "http://localhost:7779/members",
        formData
      );
      console.log(response, "Ress");
      setSnackbarMessage("Member added successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/table/plugins1"); // Redirect to the members list page after successful submission
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Error adding member, please try again.");
      setOpenSnackbar(true);
      console.error("Error adding member:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}>
      <Card>
        <Box m={2}>
          <Typography textAlign={"center"} variant="h6" gutterBottom>
            Add New Member
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Member Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Member Name"
                  fullWidth
                  name="member"
                  value={formData.member}
                  onChange={handleInputChange}
                  error={!!errorMessages.member}
                  helperText={errorMessages.member}
                />
              </Grid>

              {/* Age */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Age"
                  fullWidth
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  error={!!errorMessages.age}
                  helperText={errorMessages.age}
                />
              </Grid>

              {/* Education */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Education"
                  fullWidth
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  error={!!errorMessages.education}
                  helperText={errorMessages.education}
                />
              </Grid>

              {/* Father's Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Father's Name"
                  fullWidth
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Mother's Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mother's Name"
                  fullWidth
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* City */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="City"
                  fullWidth
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!errorMessages.city}
                  helperText={errorMessages.city}
                />
              </Grid>

              {/* Profession */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Profession"
                  fullWidth
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  error={!!errorMessages.profession}
                  helperText={errorMessages.profession}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Enabled">Enabled</MenuItem>
                    <MenuItem value="Disabled">Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Add Member
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Snackbar for success/error messages */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default AddMember;
