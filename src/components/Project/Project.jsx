import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RoomOutlined,
  WatchLaterOutlined,
  ExpandMore,
} from "@mui/icons-material";
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  Box,
  Skeleton,
  Grow,
  ButtonBase,
  CardContent,
  CardActions,
  Collapse,
  CardActionArea,
  ClickAwayListener,
} from "@mui/material";

import useStyles from "./styles";
import image from "../../images/pic1.jpg";
import { setHideMap } from "../../features/utilsSlice";
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import { setLocationCoords } from "../../features/locations/locationsSlice";
import { setSelectedProject } from "../../features/projects/projectsSlice";

const trimAddress = (address = "") => {
  const addressArr = address.split(",");

  addressArr.pop(); // getting out "United States" from the address
  if (addressArr.length > 2) addressArr.pop(); // getting out "Massachusetts" from the address

  return addressArr.join(",");
};

const Project = ({ projectInfo: { id, fields }, skeleton, home }) => {
  const dispatch = useDispatch();
  const { breakPoint } = useWindowSize();
  const [expanded, setExpanded] = useState(false);
  const { renderFullMap } = useDeterminePageSize();
  const classes = useStyles({ home, expanded, breakPoint });
  const [delayedEffect, setDelayedEffect] = useState(renderFullMap);
  const { selectedProject } = useSelector((store) => store.projects);

  const address = trimAddress(fields?.Address);
  useEffect(() => {
    const delayedTimeout = setTimeout(() => {
      setDelayedEffect(renderFullMap);
    }, 150);

    return () => {
      clearTimeout(delayedTimeout);
    };
  }, [renderFullMap]);

  const handleClick = () => {
    if (expanded) {
      setExpanded(false);
      return dispatch(setSelectedProject({ id: "", fields: {} }));
    }

    setExpanded(true);
    dispatch(setLocationCoords({ lat: fields.Lat, lng: fields.Lng }));

    if (breakPoint === "lg") {
      setTimeout(() => dispatch(setSelectedProject({ id, fields })));
    }
  };

  useEffect(() => {
    if (!selectedProject?.clickedMarker || id !== selectedProject.id) return;

    const item = document.getElementById(selectedProject.id);
    if (!item) return;

    // This is admittedly a flawed way to get the element i needed but this worked after several hours of trying and failing
    const parentElement =
      item.parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    parentElement?.scroll({ top: item.offsetTop - 20, behavior: "auto" });
    const timeout = setTimeout(() => {
      setExpanded(true);
    });

    return () => {
      // clearTimeout(timeout);
    };
  }, [selectedProject]);

  const handleClickAway = () => {
    if (expanded && selectedProject.id !== id) setExpanded(false);
    if (breakPoint === "lg")
      dispatch(setSelectedProject({ id: "", fields: {} }));
  };

  const ref = useCallback((node) => {
    node?.setAttribute("id", id);
  }, []);

  return (
    <Grow in>
      <Grid
        item
        lg={delayedEffect ? 11 : 4}
        md={delayedEffect ? 11 : 6}
        sm={6}
        xs={11}
      >
        {skeleton ? (
          <Card className={classes.card} elevation={0}>
            <Skeleton variant="rectangular" height={400} width={400} />
          </Card>
        ) : (
          <Card className={classes.card} elevation={5}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <CardActionArea
                sx={{ height: "100%" }}
                onClick={handleClick}
                ref={ref}
              >
                {/* <CardMedia
                  src={image}
                  component="img"
                  className={classes.image}
                /> */}
                <CardContent>
                  <Box className={classes.cardContent}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      noWrap={!expanded}
                    >
                      {fields.Title}
                    </Typography>
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
                  {breakPoint !== "lg" && (
                    <ButtonBase onClick={() => dispatch(setHideMap(false))}>
                      <Typography className={classes.mapLink}>
                        See on Map
                      </Typography>
                    </ButtonBase>
                  )}

                  <ExpandMore className={classes.expandedIcon} />
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent className={classes.desctiption}>
                    <Typography variant="body2">
                      {fields.Description}
                    </Typography>
                  </CardContent>
                </Collapse>
              </CardActionArea>
            </ClickAwayListener>
          </Card>
        )}
      </Grid>
    </Grow>
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

export default Project;
