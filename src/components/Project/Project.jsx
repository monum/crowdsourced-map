import { useState, useEffect } from "react";
import { formatDistance, subDays } from "date-fns";
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  Box,
  Skeleton,
  Grow,
} from "@mui/material";
import { RoomOutlined, WatchLaterOutlined } from "@mui/icons-material/";

import image from "../../images/pic1.jpg";
import useStyles from "./styles";
import { useDeterminePageSize } from "../../hooks";

const trimAddress = (address = "") => {
  const addressArr = address.split(",");

  addressArr.pop(); // getting out "United States" from the address
  if (addressArr.length > 2) addressArr.pop(); // getting out "Massachusetts" from the address

  return addressArr.join(",");
};

const Project = ({ projectInfo, skeleton }) => {
  const classes = useStyles();
  const { renderFullMap } = useDeterminePageSize();
  const [delayedEffect, setDelayedEffect] = useState(renderFullMap);

  const address = trimAddress(projectInfo?.Address);

  useEffect(() => {
    const delayedTimeout = setTimeout(() => {
      setDelayedEffect(renderFullMap);
    }, 150);

    return () => {
      clearTimeout(delayedTimeout);
    };
  }, [renderFullMap]);

  return (
    <Grow in>
      <Grid
        item
        lg={delayedEffect ? 11 : 4}
        md={delayedEffect ? 11 : 6}
        xs={11}
      >
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
                  <RoomOutlined fontSize="small" /> {address}
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
    </Grow>
  );
};

export default Project;
