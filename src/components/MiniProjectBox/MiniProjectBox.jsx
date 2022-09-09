// imports from installed modules
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
  Slide,
} from "@mui/material";

import { SyncLoader } from "react-spinners";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// imports from local files
import {
  toggleSuggestingProject,
  resetProjectDetails,
} from "../../features/suggestProject/newProjectSlice";

import useStyles from "./styles";
import config from "../../app-config.json";
import { useWindowSize } from "../../hooks";
import { formatTime, trimAddress } from "../../utils";
import { setSelectedProject } from "../../features/projects/projectsSlice";
import { setPreviousLocation, setHideMap } from "../../features/utilsSlice";

const MiniProjectBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const closeButton = useRef(null);
  const { width } = useWindowSize();

  const [open, setOpen] = useState(true);
  const [bottom, setBottom] = useState(25);
  const [expanded, setExpanded] = useState();

  const classes = useStyles({ expanded, bottom, width });
  const { previousLocation } = useSelector((store) => store.utils);

  const {
    selectedProject: { id, fields },
  } = useSelector((store) => store.projects);
  const {
    isActive: isSuggestingProject,
    coords,
    address: suggestionAddress,
  } = useSelector((store) => store.newProject);

  const address = trimAddress(fields?.Address);
  const trimmedSuggestionAddress = trimAddress(suggestionAddress?.data);

  const handleClose = () => {
    // clear out the data and close the mini project box
    dispatch(resetProjectDetails());
    dispatch(toggleSuggestingProject(false));
    dispatch(setSelectedProject({ id: "", fields: {} }));
    navigate(previousLocation.pathname);
  };

  useEffect(() => {
    // show the mini project box as need be
    if (isSuggestingProject || id) {
      setOpen(true);
      setBottom(25);
    } else {
      setOpen(false);
    }
  }, [id, isSuggestingProject]);

  const handler = useSwipeable({
    // setting the handler for the swipe to close feature
    onSwiping: (e) => {
      if (e.dir === "Down" && e.velocity > 0.03)
        setBottom((state) => state - e.velocity * 15);
      else if (e.dir === "Up" && bottom < 25)
        setBottom((state) => state + e.velocity * 100);
    },
    onSwiped: (e) => {
      if ((e.velocity > 0.3 && e.dir === "Down") || bottom < -55) {
        setOpen(false);
        handleClose();
      } else setBottom(25);
    },
    preventScrollOnSwipe: true,
  });

  const handleVerifyLocation = () => {
    // show the form for suggesting the project
    dispatch(setPreviousLocation(location));
    navigate(`${config.homepage}/suggest-a-project`);
    dispatch(setHideMap(true));
  };

  const handleClick = (e) => {
    // expand the mini project box to see the project description
    if (closeButton.current.contains(e.target)) handleClose();
    else setExpanded(!expanded);
  };

  return (
    <Slide in={open} direction="up" {...handler}>
      <Card className={classes.miniProjectBox} elevation={5}>
        {!isSuggestingProject && id && (
          // we wanna show the selected project
          <CardActionArea
            sx={{ height: "100%", cursor: "pointer" }}
            onClick={handleClick}
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
              action={
                <IconButton ref={closeButton}>
                  <CloseRounded />
                </IconButton>
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
              <CardContent className={classes.description}>
                <Typography variant="body2">{fields.Description}</Typography>
              </CardContent>
            </Collapse>
          </CardActionArea>
        )}

        {isSuggestingProject && (
          // we wanna show a box with location details of where the project marker is
          <>
            <CardHeader
              action={
                <div onClick={handleVerifyLocation}>
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
    </Slide>
  );
};

export default MiniProjectBox;
