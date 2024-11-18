import * as React from "react";
import Button from "@mui/material/Button";
import Colors from "../../constants/Colors";

const CustomButton = (props) => {
  const {
    title,
    borderButton,
    handleClick,
    bgColor,
    padding,
    showRightIcon,
    rightIconElement,
    type,
    disabled,
  } = props;

  const buttonStyle = {
    fontSize: props.fontSize ? props.fontSize : "12px",
    borderRadius: props.borderRadius ? props.borderRadius : 20,
    fontWeight: "bold",
    backgroundColor: props.bgColor ? bgColor : Colors.lightBlue,
    textTransform: "none",
    fontFamily: "MetropolisLight",
    padding: padding ? padding : 1.5,
    lineHeight: "12px",
    ":hover": {
      bgcolor: "#FA8842", // theme.palette.primary.main
      color: "white",
    },
    color: props.color ? props.color : "white",
    border: props.border ? props.border : "",
  };

  const outlinebuttonStyle = {
    fontSize: "12px",
    borderRadius: 20,
    fontWeight: "bold",
    padding: padding ? padding : 1.5,
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#fff",
    textTransform: "none",
    fontFamily: "MetropolisLight",
    borderColor: props.borderColor ? props.borderColor : "#000000",
    color: props.color ? props.color : "#FA8842",
    lineHeight: "12px",
    ":hover": {
      bgColor: "#fff",
      color: "#000000",
      borderColor: "#000000",
    },
  };

  return borderButton ? (
    <Button
      variant="outlined"
      disabled={disabled}
      fullWidth
      type={type}
      sx={outlinebuttonStyle}
      onClick={handleClick}
    >
      {title} {showRightIcon && rightIconElement}{" "}
    </Button>
  ) : (
    <Button
      variant="contained"
      fullWidth
      disabled={disabled}
      type={type}
      sx={buttonStyle}
      onClick={handleClick}
    >
      {" "}
      {title} {showRightIcon && rightIconElement}
    </Button>
  );
};

export default CustomButton;
