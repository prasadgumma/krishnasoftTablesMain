// import React from "react";
// import { Typography } from "@mui/material";
// import Colors from "../../constants/Colors";
// import TextField from "@mui/material/TextField";
// import { inputLabelClasses } from "@mui/material/InputLabel";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// const CustomInput = React.forwardRef((props, ref) => {
//   const {
//     placeHolder,
//     label,
//     endAdornment,
//     backgroundColor,
//     rightIcon,
//     rightIconElement,
//     multiline,
//     type,
//     name,
//     helperText,
//     inputLabel,
//     onChange,
//     value,
//     ...field
//   } = props;

//   const labelStyle = {
//     fontFamily: "MetropolisSemiBold",
//     fontSize: 13,
//     color: Colors.textColor,
//   };

//   const { height, padding, transform, borderRadius, border } = props;

//   return (
//     <>
//       <p style={labelStyle}>{label}</p>

//       <TextField
//         {...field}
//         defaultValue={props.defaultValue}
//         onWheel={(event) => event.target.blur()}
//         onKeyPress={props.onKeyPress}
//         disabled={props.disabled}
//         size={"medium"}
//         label={inputLabel}
//         InputProps={{
//           endAdornment: endAdornment ? (
//             <InputAdornment position="end">{endAdornment}</InputAdornment>
//           ) : undefined,
//         }}
//         InputLabelProps={{
//           sx: {
//             color: "#000000",
//             fontSize: "12px",
//             top: "-5px",
//             [`&.${inputLabelClasses.shrink}`]: {
//               color: "#000000",
//               fontSize: "15px",
//               top: "0px",
//             },
//           },
//         }}
//         type={type}
//         sx={{
//           "& .MuiInputBase-root.MuiOutlinedInput-root": {
//             color: "#000000",
//             backgroundColor: props.backgroundColor
//               ? props.backgroundColor
//               : null,
//           },
//           "& .MuiInputBase-input.MuiOutlinedInput-input": {
//             padding: padding ? padding : multiline ? "0px" : "12px",
//             height: height ? height : "12px",
//             fontSize: "12px",
//             fontFamily: "MetropolisRegular",
//             borderRadius: borderRadius ? borderRadius : multiline ? "0px" : 25,
//           },
//           "& .MuiOutlinedInput-notchedOutline": {
//             border: border ? border : "0.5px solid #000000",
//             borderRadius: borderRadius ? borderRadius : 25,
//           },
//           ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
//             transform: transform ? transform : "translate(14px, -2px) scale(1)",
//           },
//           " & label.Mui-focuse": {
//             color: "#000000",
//           },
//           "& .MuiOutlinedInput-root": {
//             "&.Mui-focused fieldset": {
//               borderColor: "#000000",
//             },
//           },
//           "& input::placeholder": {
//             color: "#000000",
//             fontSize: 12,
//             opacity: 0.8,
//           },
//         }}
//         name={name}
//         autoComplete="off"
//         placeholder={placeHolder}
//         fullWidth={true}
//         // endAdornment={props.endAdornment ? props.endAdornment : undefined}

//         multiline={multiline ? multiline : false}
//         minRows={props.minRows}
//         maxRows={props.maxRows}
//         onChange={onChange}
//         value={value}
//       />
//       {props.helperText && (
//         <Typography mt={"6px"} fontSize={"12px"} color={"red"}>
//           {helperText}
//         </Typography>
//       )}
//     </>
//   );
// });

// export const CustomInputWithIcon = (props) => {
//   const {
//     placeHolder,
//     label,
//     endAdornment,
//     backgroundColor,
//     rightIcon,
//     rightIconElement,
//     multiline,
//     type,
//     name,
//     helperText,
//     inputLabel,
//     onChange,
//     value,
//     ...field
//   } = props;

//   const labelStyle = {
//     fontFamily: "MetropolisSemiBold",
//     fontSize: 13,
//     color: Colors.textColor,
//   };

//   const { color, top, height, padding, transform, borderRadius, border } =
//     props;

//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <p style={labelStyle}>{label}</p>

//       <TextField
//         {...field}
//         onWheel={(event) => event.target.blur()}
//         onKeyPress={props.onKeyPress}
//         disabled={props.disabled}
//         size={"medium"}
//         label={inputLabel}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//               >
//                 {showPassword ? (
//                   <Visibility sx={{ width: "20px" }} />
//                 ) : (
//                   <VisibilityOff sx={{ width: "20px" }} />
//                 )}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         InputLabelProps={{
//           sx: {
//             color: "#000000",
//             fontSize: "12px",
//             top: "-5px",
//             [`&.${inputLabelClasses.shrink}`]: {
//               color: "#000000",
//               fontSize: "15px",
//               top: "0px",
//             },
//           },
//         }}
//         type={showPassword ? "text" : "password"}
//         sx={{
//           "& .MuiInputBase-root.MuiOutlinedInput-root": {
//             color: "#000000",
//             backgroundColor: props.backgroundColor
//               ? props.backgroundColor
//               : null,
//           },
//           "& .MuiInputBase-input.MuiOutlinedInput-input": {
//             padding: padding ? padding : multiline ? "0px" : "12px",
//             height: height ? height : "12px",
//             fontSize: "12px",
//             fontFamily: "MetropolisRegular",
//             borderRadius: borderRadius ? borderRadius : multiline ? "0px" : 25,
//           },
//           "& .MuiOutlinedInput-notchedOutline": {
//             border: border ? border : "0.5px solid #000000",
//             borderRadius: borderRadius ? borderRadius : 25,
//           },
//           ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
//             transform: transform ? transform : "translate(14px, -2px) scale(1)",
//           },
//           " & label.Mui-focuse": {
//             color: "#000000",
//           },
//           "& .MuiOutlinedInput-root": {
//             "&.Mui-focused fieldset": {
//               borderColor: "#000000",
//             },
//           },
//           "& input::placeholder": {
//             color: "#000000",
//             fontSize: 12,
//             opacity: 0.8,
//           },
//         }}
//         name={name}
//         autoComplete="off"
//         placeholder={placeHolder}
//         fullWidth={true}
//         // endAdornment={props.endAdornment ? props.endAdornment : undefined}
//         multiline={multiline ? multiline : false}
//         onChange={onChange}
//         value={value}
//       />
//       {props.helperText && (
//         <Typography mt={"6px"} fontSize={"12px"} color={"red"}>
//           {helperText}
//         </Typography>
//       )}
//     </>
//   );
// };

// export default CustomInput;
