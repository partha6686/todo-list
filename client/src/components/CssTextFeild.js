import React from "react";
import { Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextFeild = styled(TextField)({
  "& ::placeholder": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "gray",
  },
  "& input": {
    color: "white",
  },
  "& .MuiInput": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "white",
      borderColor: "#8390c9",
    },
    "&:hover fieldset": {
      color: "white",
      borderColor: "#8390c9",
    },
    "&.Mui-focused fieldset": {
      color: "white",
      borderColor: "#8390c9",
    },
  },
});

export default CssTextFeild;
