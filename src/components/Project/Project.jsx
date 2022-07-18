import { useState, useEffect } from "react";
import { formatDistance, subDays } from "date-fns";
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { RoomOutlined, WatchLaterOutlined } from "@mui/icons-material/";

import image from "../../images/pic1.jpg";
import useStyles from "./styles";

const Project = ({ projectInfo, renderBigPage, skeleton }) => {
  const classes = useStyles();
  const [delayedEffect, setDelayedEffect] = useState(!renderBigPage);
  if (skeleton) console.log("here");

  useEffect(() => {
    let isMounted = true;
    const delayedTimeout = setTimeout(() => {
      setDelayedEffect(!renderBigPage);
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(delayedTimeout);
    };
  }, [renderBigPage]);

  return (
    <Grid item lg={delayedEffect ? 11 : 4} md={delayedEffect ? 11 : 6} xs={11}>
      {skeleton ? (
        <Card className={classes.card} elevation={0}>
          <Skeleton variant="rectangular" height={400} width={400} />
        </Card>
      ) : (
        <Card className={classes.card} elevation={5}>
          <CardMedia src={image} component="img" className={classes.image} />
          <Box className={classes.CardContent}>
            <Typography variant="h5">{projectInfo.Title}</Typography>
            <div className={classes.info}>
              <span className={classes.infoContent}>
                <RoomOutlined fontSize="small" /> {projectInfo.location}
              </span>
              <span className={classes.infoContent}>
                <WatchLaterOutlined fontSize="small" /> Submitted{" "}
                {formatDistance(subDays(new Date(), 4), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </Box>
        </Card>
      )}
    </Grid>
  );
};

export default Project;
