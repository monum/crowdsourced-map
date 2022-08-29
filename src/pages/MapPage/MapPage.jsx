import { Slide } from "@mui/material";
import { useState } from "react";

import {
  Map,
  Search,
  SuggestProject,
  Flap,
  MiniProjectBox,
} from "../../components";
import { useRef } from "react";
import useStyles from "./styles";
import { useDeterminePageSize, useWindowSize } from "../../hooks";

const MapPage = () => {
  const ref = useRef();
  const { mapSize } = useDeterminePageSize();
  const { breakPoint } = useWindowSize();
  const classes = useStyles({ mapSize, breakPoint });

  return (
    <div className={classes.mapPage} ref={ref}>
      <Search />
      <SuggestProject />
      <Map />
      {breakPoint !== "lg" && (
        // <Slide in>
        <MiniProjectBox title={"name"} window={ref.current} />
        // </Slide>
      )}
      {breakPoint === "lg" && <Flap />}
    </div>
  );
};

export default MapPage;
