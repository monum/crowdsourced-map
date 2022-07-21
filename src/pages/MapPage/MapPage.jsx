import { Map, Search, SuggestProject, Flap } from "../../components";
import useStyles from "./styles";
import { useDeterminePageSize } from "../../hooks";

const MapPage = () => {
  const { mapSize } = useDeterminePageSize();
  const classes = useStyles({ mapSize });

  return (
    <div className={classes.mapPage}>
      <Search />
      <SuggestProject />
      <Flap />
      <Map />
    </div>
  );
};

export default MapPage;
