import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff242a",
    },
    secondary: {
      main: "#FFFFFF",
    },
    tertiary: {
      main: "#000000",
    },
    custom: {
      main: "#252a3f",
      light: "#353b55",
      gray: "#B2B2B2",
    },
  },
  typography: {
    h1: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: "bold",
    },
    h3: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "18px",
    },
    h4: {
      fontFamily: "'Inter', sans-serif",
      fontSize: "xx-large",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "'Open Sans', sans-serif",
    },
    p: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "16px",
    },
  },
});

export default theme;
