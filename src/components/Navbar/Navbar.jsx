import { AppBar, Typography, Box, Button, Badge } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FilterAltRounded } from "@mui/icons-material";

import Logo from "../../images/mainLogo.svg";
import { APP_NAME } from "../../config";
import { FilterModal } from "../";
import { useWindowSize } from "../../hooks";
import useStyles from "./style";

const navLinks = [
  { name: "Projects", link: "/crowdsourced-map/" },
  { name: "About", link: "/crowdsourced-map/about" },
  { name: "Contact Us", link: "/crowdsourced-map/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const { width, breakPoint } = useWindowSize();
  const classes = useStyles({ breakPoint, width });
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
          {APP_NAME}
        </Typography>

        {width > 750 && (
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
            sh
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
