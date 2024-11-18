import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./tabs.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: "0px 20px 20px 20px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs(props) {
  const { tabOptions } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          display={"flex"}
          justifyContent={"flex-start"}
          className={"boxedWidthForTabs"}
        >
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
            value={value}
            onChange={handleChange}
            className="tabs"
            aria-label="basic tabs example"
          >
            {tabOptions?.map((option, index) => {
              return (
                <Tab
                  sx={{
                    "&.MuiTab-root": {
                      textTransform: "none",
                      color: "white",
                      fontFamily: "MetropolisSemiBold",
                      fontSize: "22px",
                    },
                  }}
                  label={option.name}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        </Box>
      </Box>
      {tabOptions?.map((option, index) => {
        return (
          <>
            <TabPanel value={value} index={index}>
              {option.component}
            </TabPanel>
          </>
        );
      })}
    </Box>
  );
}
