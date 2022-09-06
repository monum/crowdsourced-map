// imports from installed modules
import { useState } from "react";
import { useSelector } from "react-redux";
import { FilterAltRounded } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Typography, Box, Button, Badge } from "@mui/material";

// imports from local files
import useStyles from "./style";
import config from "../../app-config.json";
import Logo from "../../images/mainLogo.svg";

import { FilterModal } from "../";
import { useWindowSize } from "../../hooks";

// data required for each navivation link
const navLinks = [
  { name: "Projects", link: `${config.homepage}/` },
  { name: "About", link: `${config.homepage}/about` },
  { name: "Contact Us", link: `${config.homepage}/contact` },
];

const Navbar = () => {
  const location = useLocation();
  const { width, breakPoint } = useWindowSize();
  const classes = useStyles({ breakPoint, width });
  const [showFilter, setShowFilter] = useState(false);

  const { filteredData } = useSelector((store) => store.projects);

  const navClassName = (isActive, name) => {
    // determine what the navigation link className will be
    return isActive ||
      (name === "Projects" && location.pathname === config.homepage)
      ? `${classes.navLink} ${classes.isActive}`
      : classes.navLink;
  };

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
          {config.name}
        </Typography>

        {width > 750 && (
          // display the navigation links
          <nav className={classes.nav}>
            {navLinks.map(({ name, link }, i) => (
              <NavLink
                key={i}
                className={({ isActive }) => navClassName(isActive, name)}
                to={link}
              >
                {name}
              </NavLink>
            ))}
          </nav>
        )}

        <Button
          disableElevation
          startIcon={<FilterAltRounded />}
          className={classes.filterButton}
          onClick={() => setShowFilter(true)}
        >
          <Badge
            invisible={filteredData.length > 0 ? false : true}
            color="primary"
            badgeContent={4}
            sx={{ padding: "1px" }}
            variant="dot"
          >
            Filters
          </Badge>
        </Button>
      </Box>
      <FilterModal
        open={showFilter}
        setOpen={setShowFilter}
        onClose={() => setShowFilter(false)}
      />
    </AppBar>
  );
};

export default Navbar;
