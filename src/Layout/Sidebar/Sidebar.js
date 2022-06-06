import { Box, Chip, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Manu from "../../components/Manu-items/Manu_Items";

const usestyles = makeStyles(() => ({
  navlink: {
    color: "#029904",
    textDecoration: "none",
  },
  manuItems: {
    display: "flex",
    alignItems: "center",
    padding: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#c6c6c6",
      borderRadius: "5px ",
    },
  },
  icons: {
    color: "#029904",
    marginRight: "6px",
  },
}));
const Sidebar = () => {
  const classes = usestyles();
  return (
    <Box>
      {Manu.map((manu) => (
        <Box className={classes.manuItems}>
          <span className={classes.icons}> {manu.icon}</span>
          <Link to={manu.path} className={classes.navlink}>
            {manu.title}
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
