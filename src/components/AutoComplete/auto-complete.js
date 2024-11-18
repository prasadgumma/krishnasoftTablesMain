import React from "react";
import { Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Colors from "../../constants/Colors";
// import { styles } from "./styles";
const filter = createFilterOptions();

const CustomAutoComplete = React.forwardRef((props) => {
  const {
    placeholder,
    options,
    disabled,
    multiline,
    placeholderColor,
    placeholderColorOpacity,
    placeholderSize,
    defaultValue,
    label,
    multiple,
    onChange,
    value,
    singleSelection,
    field,
    ref,
    error,
    addText,
    limitTags,
  } = props;

  const styledAutoComplete = {
    "& .MuiFormLabel-root:not(.MuiInputLabel-shrink)": {
      fontSize: "12px",
      top: "-7px",
    },
    "& .MuiFormLabel-root": {
      color: "#000000",
      opacity: "0.8",
    },
    "& .MuiButtonBase-root.MuiChip-root": {
      borderRadius: "5px",
      margin: "0px",
      backgroundColor: "#FB8842",
      color: "#ffff",
      "& svg": {
        color: "#ffff",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `5px`,
        borderColor: `black`,
      },
      "& .MuiInputBase-input": {
        fontSize: "12px",
        padding: "0px !important",
      },
      "& input::placeholder": {
        color: placeholderColor ? placeholderColor : "#000000",
        fontSize: placeholderSize ? placeholderSize : 12,
        opacity: placeholderColorOpacity ? placeholderColorOpacity : 0.8,
      },
    },
    ".css-jar0k8-MuiAutocomplete-root .MuiOutlinedInput-root ": {
      padding: "7px",
    },
    ".css-1q79v3g-MuiButtonBase-root-MuiChip-root": {
      padding: "10px 0px",
      height: "0px",
    },
    ".MuiFormHelperText-root": {
      marginLeft: "0px !important",
    },
  };

  const getAddCustomTextOpt = (multiple = false) => {
    const addCustomTextOpt = addText
      ? {
          filterOptions: (options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) =>
              typeof option === "object"
                ? inputValue === option?.name
                : inputValue === option
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push(
                multiple ? { name: inputValue, value: inputValue } : inputValue
              );
            }
            return filtered;
          },
          getOptionLabel: (option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              const updatedOption = option?.replace("Add ", "");
              return updatedOption;
            }
            // Add "xxx" option created dynamically
            if (option?.inputValue) {
              return option?.inputValue;
            }
            // Regular option
            return typeof option === "object"
              ? option?.name || ""
              : option?.toString();
          },
        }
      : {};

    return addCustomTextOpt;
  };

  let autoCompleteProps = {};
  if (singleSelection) {
    autoCompleteProps = {
      renderOption: (props, option) => <li {...props}>{option}</li>,
      ...getAddCustomTextOpt(),
    };
  } else {
    autoCompleteProps = {
      multiple,
      getOptionLabel: (option) => option?.name || "",
      ...getAddCustomTextOpt(true),
      ...(limitTags && {
        limitTags,
      }),
    };
  }

  return (
    <Box>
      <Autocomplete
        {...autoCompleteProps}
        disabled={disabled}
        sx={styledAutoComplete}
        multiple={multiple}
        defaultValue={defaultValue}
        options={options}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        onChange={(e, newValue) => onChange(e, newValue)}
        onInputChange={(e, value) => props.onInputChange(e, value)}
        value={value}
        noOptionsText={props.noOptionsText}
        renderInput={(params) => (
          <TextField
            {...field}
            {...params}
            error={error}
            helperText={props.helperText}
            inputRef={ref}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
});

export const CustomAutoCompleteWithIcon = React.forwardRef((props) => {
  const {
    placeholder,
    disabled,
    multiline,
    placeholderColor,
    placeholderColorOpacity,
    placeholderSize,
    defaultValue,
    label,
    multiple,
    onChange,
    value,
    singleSelection,
    ref,
    error,
    addText,
    limitTags,
    ...field
  } = props;

  const styledAutoComplete = {
    "& .MuiFormLabel-root:not(.MuiInputLabel-shrink)": {
      fontSize: "12px",
      top: "-7px",
    },
    "& .MuiFormLabel-root": {
      color: "#000000",
      opacity: "0.8",
    },
    "& .MuiButtonBase-root.MuiChip-root": {
      borderRadius: props.borderRadius ? props.borderRadius : "5px",
      margin: "0px",
      backgroundColor: "#FB8842",
      color: "#ffff",
      "& svg": {
        color: "#ffff",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: props.borderColor ? props.borderColor : "white",
        borderRadius: props.borderRadius ? props.borderRadius : "0px",
      },
      "&:hover fieldset": {
        borderColor: props.borderColor ? props.borderColor : "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: props.borderColor ? props.borderColor : "white",
      },
      "& .MuiInputBase-input": {
        fontSize: "12px",
        padding: "0px !important",
      },
      "& input::placeholder": {
        color: placeholderColor ? placeholderColor : "#000000",
        fontSize: placeholderSize ? placeholderSize : 12,
        opacity: placeholderColorOpacity ? placeholderColorOpacity : 0.8,
      },
    },
    ".MuiOutlinedInput-root ": {
      padding: props.padding ? props.padding : "9px",
    },
    ".MuiButtonBase-root-MuiChip-root": {
      padding: "10px 0px",
      height: "0px",
    },
    width: props.width ? props.width : "320px",

    "& .MuiAutocomplete-root:hover": {
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : "transparent",
      borderColor: "red",
    },
    ".css-x6g01x-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input":
      {
        padding: "0px",
      },
    ".MuiFormHelperText-root": {
      marginLeft: "0px !important",
    },
  };

  const labelStyle = {
    fontFamily: "MetropolisSemiBold",
    fontSize: 13,
    color: Colors.textColor,
  };

  return (
    <>
      <p style={labelStyle}>{props.label}</p>

      <Autocomplete
        {...field}
        defaultValue={props.defaultValue}
        sx={styledAutoComplete}
        noOptionsText={props.noOptionsText}
        value={value}
        open={props.open}
        onOpen={props.onOpen}
        onClose={props.onClose}
        filterOptions={(options) => options}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        getOptionLabel={(option) => option.title || ""}
        options={props.options}
        loading={props.loading}
        disabled={props.disabled}
        onChange={props.handleChange}
        onInputChange={props.onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            {...field}
            inputRef={ref}
            error={error}
            helperText={props.helperText}
            placeholder={
              props.placeholder ? props.placeholder : "Search Location"
            }
            InputProps={{
              ...params.InputProps,
              startAdornment: null,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? (
                    <CircularProgress color="inherit" size={14} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
});

export default CustomAutoComplete;
