import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
  Badge,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosRounded, FilterAltRounded } from "@mui/icons-material";
import {
  InfoRounded,
  MailRounded,
  MapRounded,
  LayersRounded,
} from "@mui/icons-material";

import useStyles from "./styles";
import { FilterModal } from "../../components";
import { setHideMap } from "../../features/utilsSlice";

const BottomNav = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(" ");
  const [showFilter, setShowFilter] = useState(false);
  const { hideMap } = useSelector((store) => store.utils);
  const { filteredData } = useSelector((store) => store.projects);

  const handleChange = (e, newVal) => {
    if (newVal === "map") return;
    navigate(`/crowdsourced-map/${newVal}`);
    setValue(newVal);
  };
  return (
    <Paper className={classes.navContainer} elevation={10}>
      {hideMap ? (
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Projects"
            value=" "
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
            onClick={() => dispatch(setHideMap(false))}
            label="show map"
            value="map"
            icon={<MapRounded />}
            showLabel
          />
        </BottomNavigation>
      ) : (
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
              sh
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
