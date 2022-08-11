import { Map, Search, SuggestProject, Flap } from "../../components";
import useStyles from "./styles";
import { useDeterminePageSize, useWindowSize } from "../../hooks";

const MapPage = () => {
  const { mapSize } = useDeterminePageSize();
  const { width } = useWindowSize();
  const classes = useStyles({ mapSize });

  return (
    <div className={classes.mapPage}>
      <Search />
      <SuggestProject />
      <Map />

      {width > 890 && <Flap />}
    </div>
  );
};

export default MapPage;
