// imports from installed modules
import { Marker } from "react-map-gl";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as MarkerIcon } from "../../images/map-marker.svg";

// imports from local files
import useStyles from "./styles";
import { setSelectedProject } from "../../features/projects/projectsSlice";

const ProjectMarker = ({ id, coords, fields }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [opacity, setOpacity] = useState();
  const [width, setWidth] = useState(30);
  const { selectedProject } = useSelector((store) => store.projects);

  useEffect(() => {
    // set the marker of any non selected project to be faded out
    if (!selectedProject?.id || id === selectedProject?.id)
      return setOpacity(1);

    setOpacity(0.4);
  }, [selectedProject]);

  const handleClick = () => {
    dispatch(setSelectedProject({ clickedMarker: true, id, fields }));
  };

  return (
    <Marker latitude={coords.lat} longitude={coords.lng} onClick={handleClick}>
      <Tooltip
        onMouseEnter={() => setWidth(45)}
        onMouseLeave={() => setWidth(30)}
        className={classes.toolTip}
        title={fields?.Title}
        arrow
      >
        <MarkerIcon width={width} opacity={opacity} />
      </Tooltip>
    </Marker>
  );
};

export default ProjectMarker;
