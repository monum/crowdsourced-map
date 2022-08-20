import { useSelector, useDispatch } from "react-redux";
import { Marker } from "react-map-gl";
import {
  Tooltip,
  Typography,
  Card,
  CardActionArea,
  ClickAwayListener,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CircleNotificationsRounded as Circle } from "@mui/icons-material";

import useStyles from "./styles";
import { useWindowSize } from "../../hooks";
import { setSelectedProject } from "../../features/projects/projectsSlice";

const ProjectMarker = ({ id, coords, fields }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { breakPoint } = useWindowSize();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("medium");
  const { selectedProject } = useSelector((store) => store.projects);

  useEffect(() => {
    if (!selectedProject?.id || id === selectedProject?.id) return setColor("");
    if (breakPoint !== "lg") return;

    setColor("disabled");
  }, [selectedProject]);

  const handleMarkerClick = () => {
    // if (breakPoint === "lg")
    dispatch(setSelectedProject({ clickedMarker: true, id, fields }));
    // else {
    //   // setShowProject(true);
    // }
  };

  return (
    // <ClickAwayListener >
    <Marker
      latitude={coords.lat}
      longitude={coords.lng}
      onClick={handleMarkerClick}
    >
      <Tooltip
        onMouseEnter={() => setSize("large")}
        onMouseLeave={() => setSize("medium")}
        className={classes.toolTip}
        title={fields?.Title}
        arrow
      >
        <Circle fontSize={size} color={color} />
      </Tooltip>
    </Marker>
    // </ClickAwayListener>
  );
};

export default ProjectMarker;
