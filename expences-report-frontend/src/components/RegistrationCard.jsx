import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import authService from "../api/authService";
import { useNavigate } from "react-router-dom";

const RegistrationCard = () => {

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

    
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Validazione semplice
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Il nome è obbligatorio";
    }
    if (!form.surname.trim()) {
      newErrors.surname = "Il cognome è obbligatorio";
    }
    if (!form.email) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Formato email non valido";
    }
    if (!form.password) {
      newErrors.password = "La password è obbligatoria";
    } else if (form.password.length < 8) {
      newErrors.password = "Minimo 8 caratteri";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Serve almeno una maiuscola";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Serve almeno un numero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form inviato:", form);
      try {
        const response = await authService.register(form);
        navigate("/login");

  } catch (error) {
    console.error("Errore registrazione:", error.response?.data || error.message);
  }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", bgcolor: "#2c2c2c", color: "#fff" }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />
            <TextField
              label="Cognome"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              error={!!errors.surname}
              helperText={errors.surname}
              fullWidth
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />
               <ThemeProvider theme={themeNeonYellow}>
            <Button type="submit"  label="Registrati">
                Registrati
            </Button>
            </ThemeProvider>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegistrationCard;
