import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import styles from "./dialog.module.css";
import "./dialog.css";
import { Box } from "@mui/material";

const CustomDialog = (props) => {
  const { children, open, onClose, title, fullScreen } = props;

  return (
    <>
      <Box width={"100%"}>
        <Dialog
          className="mainDialogueContainer"
          maxWidth={props.maxWidth ? props.maxWidth : null}
          fullScreen={fullScreen}
          open={open}
          onClose={onClose}
        >
          <DialogTitle
            sx={{
              bgcolor: props.bgcolor,
              fontWeight: props.fontWeight,
            }}
          >
            {title}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                borderRadius: props.borderRadius,
                width: props.width,
                height: props.height ? props.height : "auto",
              }}
            >
              {children}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default CustomDialog;
