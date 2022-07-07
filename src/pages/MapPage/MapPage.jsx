import { useEffect, useState } from "react";

import { Map, Search, SuggestProject, Flap } from "../../components";
import useStyles from "./styles";
import { useDeterminePageSize } from "../../hooks";

const MapPage = ({ setMapIsActive, mapIsActive }) => {
  const { mapSize } = useDeterminePageSize(mapIsActive);

  const classes = useStyles({ mapSize });

  return (
    <div className={classes.mapPage}>
      <Search />
      <SuggestProject />
      <Flap setMapIsActive={setMapIsActive} mapIsActive={mapIsActive} />
      <Map />
    </div>
  );
};

export default MapPage;
