import { useState } from "react";
import { Marker } from "react-map-gl";
import { Tooltip } from "@mui/material";
import { CircleNotificationsRounded as Circle } from "@mui/icons-material";

const ProjectMarker = ({ coords }) => {
  const [size, setSize] = useState("medium");

  return (
    <Marker latitude={coords.lat} longitude={coords.lng}>
      <Tooltip
        onMouseEnter={() => setSize("large")}
        onMouseLeave={() => setSize("medium")}
        sx={{ cursor: "pointer", padding: 0 }}
        title={<ToolTipData />}
        arrow
      >
        <Circle fontSize={size} />
      </Tooltip>
    </Marker>
  );
};

const ToolTipData = () => {
  return <>My name</>;
};

export default ProjectMarker;
