import { AppBar, Typography, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FilterAltRounded } from "@mui/icons-material";

import Logo from "../../images/mainLogo.svg";
import { FilterModal } from "../";
import useStyles from "./style";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
  { name: "Contact Us", link: "/contact" },
];

const Navbar = () => {
  const classes = useStyles();
  const [showFilter, setShowFilter] = useState(false);

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

        <Button
          disableFocusRipple
          disableElevation
          startIcon={<FilterAltRounded />}
          className={classes.filterButton}
          onClick={() => setShowFilter(true)}
        >
          Filters
        </Button>
      </Box>
      <FilterModal open={showFilter} onClose={() => setShowFilter(false)} />
    </AppBar>
  );
};

export default Navbar;
