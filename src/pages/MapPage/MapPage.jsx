// imports from installed modules
import { useRef } from "react";

// imports from local files
import {
  Map,
  SearchLocation,
  SuggestProject,
  Flap,
  MiniProjectBox,
} from "../../components";
import useStyles from "./styles";
import { useDeterminePageSize, useWindowSize } from "../../hooks";

const MapPage = () => {
  const ref = useRef();
  const { mapSize } = useDeterminePageSize();
  const { breakPoint } = useWindowSize();
  const classes = useStyles({ mapSize, breakPoint });

  return (
    <div className={classes.mapPage} ref={ref}>
      <SearchLocation />
      <SuggestProject />
      <Map />
      {breakPoint !== "lg" && (
        <MiniProjectBox title={"name"} window={ref.current} />
      )}
      {breakPoint === "lg" && <Flap />}
    </div>
  );
};

export default MapPage;
