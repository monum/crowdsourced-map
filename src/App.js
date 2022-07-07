import { useState } from "react";

import { useDeterminePageSize } from "./hooks";
import useStyles from "./globalStyles";
import { MapPage, MainPage } from "./pages/";

function App() {
  // mapIsActive MUST always start out as true or the map will not render properly
  const [mapIsActive, setMapIsActive] = useState(true);
  const globalClasses = useStyles();
  const { mainPageSize } = useDeterminePageSize(mapIsActive);

  const renderMainPage = mainPageSize === 70 || 30 ? true : false;

  return (
    <div className={globalClasses.app}>
      {renderMainPage && <MainPage mapIsActive={mapIsActive} />}
      <MapPage setMapIsActive={setMapIsActive} mapIsActive={mapIsActive} />
    </div>
  );
}

export default App;
