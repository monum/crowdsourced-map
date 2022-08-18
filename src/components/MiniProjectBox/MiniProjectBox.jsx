import { useState } from "react";
import {
  Card,
  SwipeableDrawer,
  Box,
  CssBaseline,
  Typography,
} from "@mui/material";

import useStyles from "./styles";

const drawerBleeding = 56;

const MiniProjectBox = ({ title, window }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <SwipeableDrawer
      container={window}
      sx={{ height: "fit-content", overflow: "hidden" }}
      open
      anchor="bottom"
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
    >
      <Box
        sx={{
          position: "absolute",
          // top: -drawerBleeding,
          backgroundColor: "red",
          height: 300,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          right: 0,
          left: 0,
        }}
      >
        {title}
        <Box className={classes.puller} />
        <Typography sx={{ p: 2, color: "text.secondary" }}>
          51 results
        </Typography>
      </Box>
      <Box
        sx={{
          px: 2,
          pb: 2,
          height: "100%",
          overflow: "auto",
        }}
      >
        {title}
      </Box>
    </SwipeableDrawer>
  );
};

export default MiniProjectBox;
