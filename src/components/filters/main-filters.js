import React from "react";
import MultiSelectTable from "./filter1";
import { Box, Card } from "@mui/material";
import ChipFilterTable from "./filter2";
import TableWithDrawerFilters from "./filter3";
// import DepartmentTableWithFilters from "./filter4";

const MainFilters = () => {
  return (
    <div>
      <Box m={2}>
        <Card>
          <Box m={2}>
            <MultiSelectTable />
            <ChipFilterTable />
            <TableWithDrawerFilters />
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default MainFilters;
