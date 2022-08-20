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
  const [open, setOpen] = useState(true);
  const { mapSize } = useDeterminePageSize();
  const { width, breakPoint } = useWindowSize();
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
      {width > 890 && <Flap />}
    </div>
  );
};

export default MapPage;
