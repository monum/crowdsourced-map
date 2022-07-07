import { AppBar, Typography, Box, Grow } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import Logo from "../../images/mainLogo.svg";
import useStyles from "./style";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
  { name: "Contact Us", link: "/contact" },
];

const Navbar = ({ renderBigPage }) => {
  const [delayedEffect, setDelayedEffect] = useState(renderBigPage);

  useEffect(() => {
    let isMounted = true;
    const delayedTimeout = setTimeout(() => {
      setDelayedEffect(renderBigPage);
    }, 600);

    return () => {
      isMounted = false;
      clearTimeout(delayedTimeout);
    };
  }, [renderBigPage]);

  const classes = useStyles();

  const navClassName = (isActive) =>
    isActive ? `${classes.navLink} ${classes.isActive}` : classes.navLink;

  return (
    <AppBar
      position="sticky"
      component="nav"
      className={classes.navbar}
      color="white"
    >
      <Box display="flex" className={classes.box}>
        <Typography
          // variant="h5"
          fontSize="larger"
          fontWeight="bold"
          component="h1"
          className={classes.h1}
        >
          <img src={Logo} alt="" className={classes.image} />
          BOSTON MAPS
        </Typography>
        {!renderBigPage && (
          <nav className={classes.nav}>
            {navLinks.map(({ name, link }, i) => (
              <Grow
                key={i}
                className={({ isActive }) => navClassName(isActive)}
                in={!delayedEffect}
                {...(!delayedEffect ? { timeout: i * 100 } : {})}
              >
                <NavLink to={link}>{name}</NavLink>
              </Grow>
            ))}
          </nav>
        )}
      </Box>
    </AppBar>
  );
};

export default Navbar;
