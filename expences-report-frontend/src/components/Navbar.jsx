import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { grey, yellow } from '@mui/material/colors';
import logo from '../assets/logo.png'; 

export default function Navbar({ user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  user = JSON.parse(sessionStorage.getItem("user"));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Expenses', path: '/expenses' },
    { label: 'Analytics', path: '/analytics' },
  ];

  const deleteToken = () => {
    return () => {
      sessionStorage.clear();
      window.location.href = "/";
    }
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: grey[900] }}>
        <Toolbar>
          {/* Burger menu mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', mr: 4 }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: 250, verticalAlign: 'middle', marginRight: 8 }}
            />
          </Typography>

          {/* Menu desktop allineato a sinistra */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2, flexGrow: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  '&:hover': { color: yellow[500] },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Bottone login / logout con avatar a destra */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
            {user ? (
              <>
                <Avatar src={user.avatar || '/default-avatar.png'} sx={{ width: 32, height: 32 }} />
                <Typography color="inherit">{user.name}</Typography>
                <Button onClick={deleteToken()} color="inherit">Logout</Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: grey[900],
            height: '100%',
            color: 'white',
          }}
          role="presentation"
        >
          <List>
            {/* Close drawer option */}
            <ListItem button onClick={toggleDrawer}>
              <CloseIcon sx={{ mr: 1,
                cursor: 'pointer'
               }} />
              <ListItemText sx={{ mr: 1,
                cursor: 'pointer'
               }} primary="Close" />
            </ListItem>

            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: yellow[500], color: grey[900] },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}

            {user ? (
              <ListItem button>
                <Avatar src={user.avatar || '/default-avatar.png'} sx={{ mr: 1 }} />
                <ListItemText primary={user.name} />
              </ListItem>
            ) : (
              <ListItem sx={{
                  color: 'white'
                }} button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
