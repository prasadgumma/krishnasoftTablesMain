import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";

const CustomSelect = React.forwardRef((props, ref) => {
  const { labelText, helperText, label, placeHolder, options, ...field } =
    props;

  const labelStyle = {
    fontFamily: "MetropolisSemiBold",
    fontSize: 13,
    color: "black",
  };

  return (
    <>
      <p style={labelStyle}>{labelText}</p>

      <Box className="selectPad">
        <Select
          {...field}
          // label={"age"}
          multiline={props.multiline}
          fullWidth
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography
                  style={{ fontSize: 12, color: "#000000", opacity: "0.8" }}
                >
                  {placeHolder ? placeHolder : "Select"}
                </Typography>
              );
            }

            const selectedOption = options.find(
              (option) => option.value === selected
            );
            return selectedOption?.name || "";
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{
            borderRadius: props.borderRadius ? props.borderRadius : 25,
            borderColor: `#9DA2AB`,
            borderWidth: 1,
            width: "100%",
            color: "#9DA2AB",
            fontSize: "12px",
            "& .MuiSelect-outlined.MuiInputBase-input": {
              color: "black",
            },
            "& label.Mui-focused": {
              color: "#000000",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
            },
            "& label.Mui-focused.MuiInputLabel-root": {
              bgcolor: "black",
            },
            ".MuiSelect-select": {
              padding: props.padding ? props.padding : "9px !important",
            },

            "& input::placeholder": {
              color: "#000000",
              fontSize: 12,
              opacity: 0.8,
            },
          }}
        >
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {helperText && (
        <Typography mt={"6px"} fontSize={"12px"} color={"red"}>
          {helperText}
        </Typography>
      )}
    </>
  );
});

export default CustomSelect;
