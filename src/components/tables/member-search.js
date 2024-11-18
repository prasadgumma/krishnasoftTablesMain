// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";

// function MemberSearch() {
//   return (
//     <Paper
//       component="form"
//       sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
//     >
//       <InputBase
//         sx={{ ml: 1, flex: 1 }}
//         placeholder="Search Member"
//         inputProps={{ "aria-label": "search google maps" }}
//       />
//       <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//   );
// }
// export default MemberSearch;

import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function MemberSearch({ searchTerm, handleSearchChange }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 250,
        height: 35,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Member"
        inputProps={{ "aria-label": "search members" }}
        value={searchTerm}
        onChange={handleSearchChange} // Handle change to update the parent state
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default MemberSearch;
