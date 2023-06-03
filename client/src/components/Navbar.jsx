import {
  AppBar,
  Box,
  Button,
  Container,
  Fab,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Navbar = ({
  setActiveTodos,
  setInactiveTodos,
  fetchTodos,
  setTodayTodos,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar">
      <div className="nav_head">
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography variant="h2" component="div">
            TODO!
          </Typography>
        </Link>
      </div>
      <Stack spacing={2}>
        <Link to="/add-todo" style={{ textDecoration: "none", color: "#fff" }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Todo
          </Button>
        </Link>
        <Button
          variant="contained"
          startIcon={<FilterAltIcon />}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Filter
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setActiveTodos();
              handleClose();
            }}
          >
            Active Todos
          </MenuItem>
          <MenuItem
            onClick={() => {
              setInactiveTodos();
              handleClose();
            }}
          >
            Completed
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTodayTodos();
              handleClose();
            }}
          >
            Due Today
          </MenuItem>
          <MenuItem
            onClick={() => {
              fetchTodos();
              handleClose();
            }}
          >
            Reset Filter
          </MenuItem>
        </Menu>
      </Stack>
    </div>
  );
};

export default Navbar;
