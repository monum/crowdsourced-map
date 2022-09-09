// imports from installed modules
import {
  RoomOutlined,
  WatchLaterOutlined,
  ExpandMore,
} from "@mui/icons-material";

import {
  Card,
  Grid,
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

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// imports from local files
import useStyles from "./styles";
import { trimAddress, formatTime } from "../../utils";
import { setHideMap } from "../../features/utilsSlice";
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import { setLocationCoords } from "../../features/locations/locationsSlice";
import { setSelectedProject } from "../../features/projects/projectsSlice";

const Project = ({ projectInfo: { id, fields }, skeleton }) => {
  const { breakPoint } = useWindowSize();
  const [expanded, setExpanded] = useState(false);
  const { renderFullMap } = useDeterminePageSize();
  const { hideMap } = useSelector((store) => store.utils);
  const { selectedProject } = useSelector((store) => store.projects);

  const dispatch = useDispatch();
  const address = trimAddress(fields?.Address);
  const classes = useStyles({ expanded, breakPoint });

  const handleClick = () => {
    // expand project box to see the project description and set the map center to the selected project
    if (expanded) {
      setExpanded(false);
      return dispatch(setSelectedProject({ id: "", fields: {} }));
    }

    setTimeout(() => {
      setExpanded(true);
      dispatch(setSelectedProject({ id, fields, clickedMarker: false }));
      dispatch(setLocationCoords({ lat: fields.Lat, lng: fields.Lng }));
    });
  };

  const handleClickAway = () => {
    // collapse the project box and de-emphasize the selected project
    // !hideMap is the map view on mobile
    if (!hideMap && breakPoint !== "lg") return;
    if (expanded && selectedProject.id === id) {
      setExpanded(false);
      dispatch(setSelectedProject({ id: "", fields: {} }));
    }
  };

  const handleSeeOnMap = () => {
    // show map view and center the map to the selected project
    setExpanded(true);
    dispatch(setHideMap(false));
    setTimeout(() => {
      // for a delayed effect
      dispatch(setLocationCoords({ lat: fields.Lat, lng: fields.Lng }));
      dispatch(setSelectedProject({ id, fields }));
    }, 100);
  };

  const ref = useCallback((node) => {
    node?.setAttribute("id", id);
  }, []);

  useEffect(() => {
    // scroll the project page to the selected selected project
    if (id !== selectedProject.id) return setExpanded(false);
    if (!selectedProject?.clickedMarker) return;

    const item = document.getElementById(selectedProject.id);
    if (!item) return;

    // This is admittedly a flawed way to get the element i needed but this worked after several hours of trying and failing
    const parentElement =
      item.parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    setTimeout(() => {
      setExpanded(true);
      parentElement?.scroll({ top: item.offsetTop - 20, behavior: "auto" });
    });
  }, [selectedProject]);

  return (
    <Grow in>
      <Grid
        item
        lg={renderFullMap ? 11 : 3.9}
        md={renderFullMap ? 11 : 6}
        sm={6}
        xs={11}
      >
        {skeleton ? (
          <Card className={classes.card} elevation={0}>
            <Skeleton variant="rectangular" height={181} width={400} />
          </Card>
        ) : (
          <Card className={classes.card} elevation={5}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <CardActionArea
                sx={{ height: "100%" }}
                onClick={handleClick}
                ref={ref}
              >
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
                      <span className={classes.infoContent}>
                        <RoomOutlined fontSize="small" />{" "}
                        <Typography variant="body2" noWrap={!expanded}>
                          {address}
                        </Typography>
                      </span>

                      <span className={classes.infoContent}>
                        <WatchLaterOutlined fontSize="small" />
                        <Typography variant="body2" noWrap={!expanded}>
                          Submitted {formatTime(fields.Timestamp)}
                        </Typography>
                      </span>
                    </div>
                  </Box>
                </CardContent>
                <CardActions sx={{ marginTop: 2.5 }}>
                  {breakPoint !== "lg" && (
                    <ButtonBase onClick={handleSeeOnMap}>
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

export default Project;
