import { useSelector, useDispatch } from "react-redux";
import { Marker } from "react-map-gl";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { CircleNotificationsRounded as Circle } from "@mui/icons-material";

import { setSelectedProject } from "../../features/projects/projectsSlice";

const ProjectMarker = ({ id, coords, title }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("medium");
  const { selectedProject } = useSelector((store) => store.projects);

  useEffect(() => {
    if (!selectedProject?.id || id === selectedProject?.id) return setColor("");

    setColor("disabled");
  }, [selectedProject]);

  const handleMarkerClick = () => {
    dispatch(setSelectedProject({ clickedMarker: true, id }));
  };

  return (
    <Marker
      latitude={coords.lat}
      longitude={coords.lng}
      onClick={handleMarkerClick}
    >
      <Tooltip
        onMouseEnter={() => setSize("large")}
        onMouseLeave={() => setSize("medium")}
        sx={{ cursor: "pointer", padding: 0 }}
        title={title}
        arrow
      >
        <Circle fontSize={size} color={color} />
      </Tooltip>
    </Marker>
  );
};

const ToolTipData = () => {
  return <>My name</>;
};

export default ProjectMarker;
