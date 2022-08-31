import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { SyncLoader } from "react-spinners";
import {
  RoomOutlined,
  WatchLaterOutlined,
  ExpandMore,
  GpsNotFixedRounded,
  CloseRounded,
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
  IconButton,
} from "@mui/material";

import useStyles from "./styles";
import { setSelectedProject } from "../../features/projects/projectsSlice";
import { setPreviousLocation, setHideMap } from "../../features/utilsSlice";
import {
  toggleSuggestingProject,
  resetProjectDetails,
} from "../../features/projects/newProjectSlice";

const offScreenX = 500;

const trimAddress = (address = "") => {
  const addressArr = address.split(",");

  addressArr.pop(); // getting out "United States" from the address
  if (addressArr.length > 2) addressArr.pop(); // getting out "Massachusetts" from the address

  return addressArr.join(",");
};

const MiniProjectBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 500, y: 0, deltaX: 0 });
  const [expanded, setExpanded] = useState();
  const classes = useStyles({ expanded });
  const { previousLocation } = useSelector((store) => store.utils);
  const {
    selectedProject: { id, fields },
  } = useSelector((store) => store.projects);
  const {
    isActive,
    coords,
    address: suggestionAddress,
  } = useSelector((store) => store.newProject);

  const address = trimAddress(fields?.Address);
  const trimmedSuggestionAddress = trimAddress(suggestionAddress?.data);

  useEffect(() => {
    if (!id && !isActive) return;

    setPosition({ ...position, x: 0 });
  }, [id, isActive]);

  const handleClose = () => {
    dispatch(resetProjectDetails());
    dispatch(toggleSuggestingProject(false));
    dispatch(setSelectedProject({ id: "", fields: {} }));
    navigate(previousLocation.pathname);
  };

  const handleDrag = () => {
    if (position.deltaX > 0.5) {
      setPosition({
        ...position,
        x: offScreenX,
      });

      handleClose();
    } else {
      setPosition({
        ...position,
        x: 0,
      });
    }
  };

  const handleRedirect = () => {
    dispatch(setPreviousLocation(location));
    navigate("/crowdsourced-map/suggest-a-project");
    dispatch(setHideMap(true));
  };

  return (
    // <Slide in={id} direction="up" {...handler}>
    <Draggable
      axis="x"
      onDrag={(_, { lastX, deltaX }) => {
        setPosition({ x: lastX, y: 0, deltaX: deltaX });
      }}
      onStop={handleDrag}
      position={position}
    >
      <Card className={classes.miniProjectBox} elevation={5}>
        {!isActive && id && (
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
              // action={
              //   <IconButton onClick={handleClose}>
              //     <CloseRounded />
              //   </IconButton>
              // }
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
        )}

        {isActive && (
          <>
            <CardHeader
              action={
                <div onClick={handleRedirect} onTouchEnd={handleRedirect}>
                  <Typography className={classes.suggestionAction}>
                    Verify Location
                  </Typography>
                </div>
              }
            />
            <CardContent className={classes.suggestionDetails}>
              <Typography className={classes.suggestionData}>
                <GpsNotFixedRounded />
                lat: {coords?.lat?.toFixed(4)}, lng: {coords?.lng?.toFixed(4)}
              </Typography>
              <div className={classes.suggestionAddress}>
                <Typography
                  sx={{ marginTop: "5px" }}
                  className={classes.suggestionData}
                >
                  <RoomOutlined />
                  {trimmedSuggestionAddress}
                </Typography>
                {suggestionAddress?.isFetching && (
                  <SyncLoader size={7} margin={4} style={{ marginBottom: 3 }} />
                )}
              </div>
            </CardContent>
          </>
        )}
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
