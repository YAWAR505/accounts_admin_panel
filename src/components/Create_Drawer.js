import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Manu from "./Manu-items/Manu_Items";
import { Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutInitiate } from "../redux/Action";
import { paths } from "./Routes/paths";

const drawerWidth = 240;
const usestyles = makeStyles(() => ({
  navlink: {
    textDecoration: "none",
    display: "flex",
    color: "#fff",
    alignItems: "center",
  },
  icons: {
    color: "green",
  },
  main: {
    backgroundColor: "#d1d7d1",
    height: "100vh",
  },
}));
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,

    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  //   necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Create_Drawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const classes = usestyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDrawerClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const signoutHanlder = () => {
    try {
      dispatch(logoutInitiate);
      navigate(paths.getLogin());
    } catch (error) {}
  };

  let activeStyle = {
    color: "#029904",
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#242426",
          }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }), color: "#029904" }}
          >
            <ChevronRightIcon />
          </IconButton>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h6" noWrap component="div">
              Accounts Dashboard
            </Typography>
            <Button
              variant="contained"
              className={classes.logoutBtn}
              onClick={signoutHanlder}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#242426",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#029904" }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Manu.map((manu, index) => (
            <ListItem button key={index} className={classes.listitem}>
              <NavLink
                to={manu.path}
                className={classes.navlink}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <ListItemIcon
                  className={classes.icons}
                  style={{ color: "#029904" }}
                >
                  {manu.icon}
                </ListItemIcon>
                <ListItemText primary={manu.title} />
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ backgroundColor: "#c6c6c6" }} />
      </Drawer>
      <Main open={open} className={classes.main}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};
export default Create_Drawer;
