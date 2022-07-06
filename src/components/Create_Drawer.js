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
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Manu from "./Manu-items/Manu_Items";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutInitiate } from "../redux/Action";
import { paths } from "./Routes/paths";
import swal from "sweetalert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    margin:'0 auto',
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

  const signoutHanlder = () => {
    swal({
      title: "Would you Want to log out?",
      text: "Once you log out , you will  be perminantly logged out !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(logoutInitiate());
        navigate(paths.getLogin());
        swal(" Log Out successfully !", {
          icon: "success",
        });
      } else {
        swal("You are not logged Out!");
      }
    });
  };
  let activeStyle = {
    color: "#2ebf30",
    textDecoration: "none",
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#242426",
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
            <IconButton size="large">
            <AccountCircleIcon sx={{ fontSize: 40 }} color="primary" />
          </IconButton>
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
            padding:"40px 0",
            justifyContent: 'space-between',
            backgroundColor: "#242426",
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
            <Grid  item button key={index} xs={12} >
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
                <ListItemText primary={manu.title}/>
              </NavLink>

            </Grid>
          ))}
         
        </Grid>
        <Button
            startIcon={<LogoutIcon/>}
              variant="contained"
              className={classes.logoutBtn}
              onClick={signoutHanlder}
            >
              Logout
      </Button>
      </Drawer>
      <Main open={open} >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};
export default Create_Drawer;
