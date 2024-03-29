// imports from installed modules
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
  Badge,
} from "@mui/material";

import {
  InfoRounded,
  MailRounded,
  MapRounded,
  LayersRounded,
} from "@mui/icons-material";

import config from "../../app-config.json";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBackIosRounded, FilterAltRounded } from "@mui/icons-material";

// imports from local files
import useStyles from "./styles";
import { useWindowSize } from "../../hooks";
import { FilterModal } from "../../components";
import { setHideMap } from "../../features/utilsSlice";

const BottomNav = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(location.pathname.split("/")[2] || " ");
  const [showFilter, setShowFilter] = useState(false);

  const { width } = useWindowSize();
  const { hideMap } = useSelector((store) => store.utils);
  const { filteredData } = useSelector((store) => store.projects);

  const handleChange = (_, newVal) => {
    // highlight the correct nav icon and navigate to the correct page
    if (newVal === "map") return;
    navigate(`${config.homepage}/${newVal}`);
    setValue(newVal);
  };

  return (
    <Paper className={classes.navContainer} elevation={10}>
      {hideMap ? (
        // display all the navigation links
        <>
          {width < 750 && (
            <BottomNavigation value={value} onChange={handleChange}>
              <BottomNavigationAction
                label="Projects"
                value=" "
                icon={<LayersRounded />}
              />
              <BottomNavigationAction
                onClick={() => dispatch(setHideMap(false))}
                label="show map"
                value="map"
                icon={<MapRounded />}
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
            </BottomNavigation>
          )}

          {width > 750 && (
            <div className={classes.tabNav}>
              <Button
                startIcon={<MapRounded />}
                onClick={() => dispatch(setHideMap(false))}
              >
                show Map
              </Button>
            </div>
          )}
        </>
      ) : (
        // display the "Hide Map" and "Filter" buttons
        <div className={classes.mapNav}>
          <Button
            startIcon={<ArrowBackIosRounded />}
            onClick={() => dispatch(setHideMap(true))}
          >
            Hide Map
          </Button>
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
        </div>
      )}
      <FilterModal
        open={showFilter}
        setOpen={setShowFilter}
        onClose={() => setShowFilter(false)}
      />
    </Paper>
  );
};

export default BottomNav;
