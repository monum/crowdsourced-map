// imports from installed modules
import { Marker } from "react-map-gl";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircleNotificationsRounded as Circle } from "@mui/icons-material";

// imports from local files
import useStyles from "./styles";
import { setSelectedProject } from "../../features/projects/projectsSlice";

const ProjectMarker = ({ id, coords, fields }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("medium");
  const { selectedProject } = useSelector((store) => store.projects);

  useEffect(() => {
    // set the marker of any non selected project to be faded out
    if (!selectedProject?.id || id === selectedProject?.id) return setColor("");

    setColor("disabled");
  }, [selectedProject]);

  const handleClick = () => {
    dispatch(setSelectedProject({ clickedMarker: true, id, fields }));
  };

  return (
    <Marker latitude={coords.lat} longitude={coords.lng} onClick={handleClick}>
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
  );
};

export default ProjectMarker;
