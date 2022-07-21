import useStyles from "./globalStyles";
import { Navbar } from "./components";
import { useDeterminePageSize } from "./hooks";
import { MapPage, MainPage } from "./pages/";

function App() {
  const globalClasses = useStyles();
  const { renderMainPage } = useDeterminePageSize();

  return (
    <div className={globalClasses.main}>
      <Navbar />
      <div className={globalClasses.app}>
        {renderMainPage && <MainPage />}
        <MapPage />
      </div>
    </div>
  );
}

export default App;
