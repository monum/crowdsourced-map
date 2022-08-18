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
  const { width, breakPoint } = useWindowSize();
  const classes = useStyles({ mapSize });

  return (
    <div className={classes.mapPage} ref={ref}>
      <Search />
      <SuggestProject />
      <Map />
      {breakPoint !== "lg" && (
        <MiniProjectBox title={"name"} window={ref.current} />
      )}
      {width > 890 && <Flap />}
    </div>
  );
};

export default MapPage;
