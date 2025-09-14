import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const themeNeonYellow = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#faff00", contrastText: "#0a0a0a" },
    background: { default: "#0a0a0a", paper: "#1f1f1f" },
    text: { primary: "#faff00", secondary: "#a3a3a3" },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        outlined: {
          borderColor: "#faff00",
          color: "#faff00",
          "&:hover": {
            borderColor: "#e6e600",
            backgroundColor: "rgba(255,255,0,0.1)",
          },
        },
      },
    },
  },
});


const themeDarkYellow = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffea00", contrastText: "#1f1f1f" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffea00", secondary: "#cccccc" },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        outlined: {
          borderColor: "#ffea00",
          color: "#ffea00",
          "&:hover": {
            borderColor: "#e6d500",
            backgroundColor: "rgba(255,234,0,0.15)",
          },
        },
      },
    },
  },
});

export default function NavigationButton({ to, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <ThemeProvider theme={themeDarkYellow}>
    <Button color="" onClick={handleClick}>
      {label}
    </Button>
    </ThemeProvider>
  );
}