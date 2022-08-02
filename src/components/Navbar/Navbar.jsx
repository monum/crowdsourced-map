import { AppBar, Typography, Box, Button, Badge } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FilterAltRounded } from "@mui/icons-material";

import Logo from "../../images/mainLogo.svg";
import { FilterModal } from "../";
import useStyles from "./style";

const navLinks = [
  { name: "Projects", link: "/crowdsourced-map/" },
  { name: "About", link: "/crowdsourced-map/about" },
  { name: "Contact Us", link: "/crowdsourced-map/contact" },
];

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [showFilter, setShowFilter] = useState(false);
  const { filteredData } = useSelector((store) => store.projects);

  const navClassName = (isActive, name) => {
    return isActive ||
      (name === "Projects" && location.pathname === "/crowdsourced-map")
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
          BOSTON MAPS
        </Typography>

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

        {filteredData.length > 0 ? (
          <Button
            disableElevation
            startIcon={<FilterAltRounded />}
            className={classes.filterButton}
            onClick={() => setShowFilter(true)}
          >
            <Badge
              color="primary"
              badgeContent={4}
              sx={{ padding: "1px" }}
              variant="dot"
            >
              Filters
            </Badge>
          </Button>
        ) : (
          <Button
            disableElevation
            startIcon={<FilterAltRounded />}
            className={classes.filterButton}
            onClick={() => setShowFilter(true)}
          >
            Filters
          </Button>
        )}
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
