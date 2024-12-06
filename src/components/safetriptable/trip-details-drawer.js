import React from "react";
import { Box, Drawer, Typography } from "@mui/material";

const TripDetailsDrawer = ({ open, onClose, tripId }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width={500}>
        <Typography variant="h6">Trip Details</Typography>
        {tripId ? (
          <Typography>Trip ID: {tripId}</Typography>
        ) : (
          <Typography>No Trip Selected</Typography>
        )}
        {/* Add additional content or API-driven details here */}
      </Box>
    </Drawer>
  );
};

export default TripDetailsDrawer;
