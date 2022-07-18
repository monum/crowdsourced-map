import {
  AppBar,
  Typography,
  Box,
  Grow,
  Button,
  ButtonGroup,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuRounded, MenuOpenRounded } from "@mui/icons-material";

import Logo from "../../images/mainLogo.svg";
import useStyles from "./style";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
  { name: "Contact Us", link: "/contact" },
];

const Navbar = () => {
  const classes = useStyles();

  const navClassName = (isActive) =>
    isActive ? `${classes.navLink} ${classes.isActive}` : classes.navLink;

  return (
    <AppBar
      position="absolute"
      component="nav"
      className={classes.navbar}
      color="white"
    >
      <Box display="flex" className={classes.box}>
        <Typography
          fontSize="larger"
          fontWeight="bold"
          component="h1"
          className={classes.h1}
        >
          <img src={Logo} alt="" className={classes.image} />
          BOSTON MAPS
        </Typography>

        <nav className={classes.nav}>
          {navLinks.map(({ name, link }, i) => (
            <NavLink
              key={i}
              className={({ isActive }) => navClassName(isActive)}
              to={link}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* <ButtonGroup>
          <Button>Search By Location</Button>
          <Button>Search By Neighborhood</Button>
        </ButtonGroup> */}
      </Box>
    </AppBar>
  );
};

export default Navbar;
