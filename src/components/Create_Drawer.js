import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Manu from "./Manu-items/Manu_Items";
import { Button, Grid, makeStyles, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutInitiate } from "../redux/Action";
import { paths } from "./Routes/paths";
import swal from "sweetalert";
import Setting from "./Constants/Setting"
import LogOut from "./Constants/LogOut";

const drawerWidth = 280;
const usestyles = makeStyles(() => ({
  navlink: {
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: "15px",
    "&:hover": {
      textDecoration: "none",
      color: "#fff",
    },

  },
  icons: {
    color: "#2ebf30",
  },
  logoutBtn: {
    backgroundColor: "#029904",
    color: "#fff",
    textTransform: "none",
    width: 130,
    margin: '0 auto',
    "&:hover": {
      backgroundColor: "#029904",
    },
  },
}));
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,

    padding: theme.spacing(2),
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
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Create_Drawer = () => {
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

  let activeStyle = {
    color: "#fff",
    textDecoration: "none",
    backgroundColor: "darkmagenta"
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#121212",
          }}
        >
          {open ? (
            <IconButton onClick={handleDrawerClose} sx={{ color: "#2ebf30" }}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }), color: "#029904" }}
            >
              <ChevronRightIcon />
            </IconButton>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <Setting />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            display: 'flex',
            flexDirection: 'column',
            padding: "40px 0",
            justifyContent: 'space-between',
            backgroundColor: "#121212",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

        <Grid container spacing={2} >
          {Manu.map((manu, index) => (
            <Grid item button key={index} xs={12} >
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

            </Grid>
          ))}

        </Grid>
        <LogOut classes={classes} />
      </Drawer>
      <Main open={open} >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};
export default Create_Drawer;
