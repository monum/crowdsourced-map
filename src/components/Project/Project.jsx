import { useState, useEffect } from "react";
import { formatDistance, subDays } from "date-fns";
import { Card, Grid, CardMedia, Typography, Box } from "@mui/material";
import { RoomOutlined, WatchLaterOutlined } from "@mui/icons-material/";

import useStyles from "./styles";

const Project = ({
  projectInfo: { image, title, location, timeSubmitted },
  renderBigPage,
}) => {
  const classes = useStyles();
  const [delayedEffect, setDelayedEffect] = useState(renderBigPage);

  useEffect(() => {
    let isMounted = true;
    const delayedTimeout = setTimeout(() => {
      setDelayedEffect(renderBigPage);
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(delayedTimeout);
    };
  }, [renderBigPage]);

  return (
    <Grid item lg={delayedEffect ? 12 : 4} md={delayedEffect ? 12 : 6} xs={12}>
      <Card className={classes.card} elevation={5}>
        <CardMedia src={image} component="img" className={classes.image} />
        <Box className={classes.CardContent}>
          <Typography variant="h5">{title}</Typography>
          <div className={classes.info}>
            <span className={classes.infoContent}>
              <RoomOutlined fontSize="small" /> {location}
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
    </Grid>
  );
};

export default Project;
