// import React, { useState } from "react";
// import { Box, Tabs, Tab, Typography } from "@mui/material";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// export default function SimpleTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="simple tabs example"
//         centered
//         textColor="primary"
//         indicatorColor="primary"
//       >
//         <Tab label="Home" {...a11yProps(0)} />
//         <Tab label="Profile" {...a11yProps(1)} />
//         <Tab label="Settings" {...a11yProps(2)} />
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         Welcome to the Home Page
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Profile Information
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Settings Page
//       </TabPanel>
//     </Box>
//   );
// }

import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: 300,
        width: "100%",
      }}
    >
      {/* Vertical Tabs */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minWidth: 150,
        }}
      >
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="Profile" {...a11yProps(1)} />
        <Tab label="Settings" {...a11yProps(2)} />
      </Tabs>

      {/* Tab Content */}
      <TabPanel value={value} index={0}>
        Welcome to the Home Page
      </TabPanel>
      <TabPanel value={value} index={1}>
        Profile Information
      </TabPanel>
      <TabPanel value={value} index={2}>
        Settings Page
      </TabPanel>
    </Box>
  );
}
