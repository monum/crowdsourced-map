import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import {
  InfoRounded,
  MailRounded,
  MapRounded,
  LayersRounded,
} from "@mui/icons-material";

import useStyles from "./styles";

const BottomNav = () => {
  const [value, setValue] = useState("projects");
  const classes = useStyles();

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };
  return (
    <Paper className={classes.navContainer} elevation={10}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Projects"
          value="projects"
          icon={<LayersRounded />}
        />
        <BottomNavigationAction
          label="About"
          value="about"
          icon={<InfoRounded />}
        />
        <BottomNavigationAction
          label="Contact Us"
          value="contact"
          icon={<MailRounded />}
        />
        <BottomNavigationAction
          label="show map"
          value="map"
          icon={<MapRounded />}
          showLabel
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
