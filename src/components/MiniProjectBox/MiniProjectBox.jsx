import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import {
  RoomOutlined,
  WatchLaterOutlined,
  ExpandMore,
} from "@mui/icons-material";
import {
  Card,
  Box,
  CardHeader,
  Collapse,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import useStyles from "./styles";

const offScreenX = 500;

const trimAddress = (address = "") => {
  const addressArr = address.split(",");

  addressArr.pop(); // getting out "United States" from the address
  if (addressArr.length > 2) addressArr.pop(); // getting out "Massachusetts" from the address

  return addressArr.join(",");
};

const MiniProjectBox = ({ title, window }) => {
  const [position, setPosition] = useState({ x: 500, y: 0, deltaX: 0 });
  const [expanded, setExpanded] = useState();
  const classes = useStyles({ expanded });
  const {
    selectedProject: { id, fields },
  } = useSelector((store) => store.projects);

  const address = trimAddress(fields?.Address);

  useEffect(() => {
    if (!id) return;

    setPosition({ ...position, x: 0 });
  }, [id]);

  const handleDrag = () => {
    if (position.deltaX > 0.35)
      setPosition({
        ...position,
        x: offScreenX,
      });
    else {
      setPosition({
        ...position,
        x: 0,
      });
    }
  };

  return (
    // <Slide in={id} direction="up" {...handler}>
    <Draggable
      axis="x"
      onDrag={(e, { lastX, deltaX, deltaY }) => {
        setPosition({ x: lastX, y: 0, deltaX: deltaX });
      }}
      onStop={handleDrag}
      position={position}
    >
      <Card className={classes.miniProjectBox} elevation={5}>
        <CardActionArea
          sx={{ height: "100%" }}
          onClick={() => setExpanded(!expanded)}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                className={classes.title}
                noWrap={!expanded}
              >
                {fields.Title}
              </Typography>
            }
          />
          <CardContent>
            <Box className={classes.cardContent}>
              <div className={classes.info}>
                {fields.Address && (
                  <span className={classes.infoContent}>
                    <RoomOutlined fontSize="small" />{" "}
                    <Typography variant="body2" noWrap={!expanded}>
                      {address}
                    </Typography>
                  </span>
                )}
                {fields.Timestamp && (
                  <span className={classes.infoContent}>
                    <WatchLaterOutlined fontSize="small" />
                    <Typography variant="body2" noWrap={!expanded}>
                      Submitted {formatTime(fields.Timestamp)}
                    </Typography>
                  </span>
                )}
              </div>
            </Box>
          </CardContent>
          <CardActions sx={{ marginTop: 2.5 }}>
            <ExpandMore className={classes.expandedIcon} />
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.desctiption}>
              <Typography variant="body2">{fields.Description}</Typography>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Card>
    </Draggable>
    // </Slide>
  );
};

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const formatTime = (dateNum) => {
  const date = new Date(dateNum);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds > 2592000) {
    const dateString = `${date.getDate()} ${
      month[date.getMonth()]
    } ${date.getFullYear()}`;

    return dateString;
  }
  const interval = intervals.find((i) => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
};

export default MiniProjectBox;
