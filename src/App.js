import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStyles from "./globalStyles";
import { Navbar, BottomNav } from "./components";
import { useDeterminePageSize, useWindowSize } from "./hooks";
import { MapPage, MainPage } from "./pages/";
import { useLazyGetProjectsQuery } from "./features/projects/projectsApi";
import { setProjects, setStatus } from "./features/projects/projectsSlice";
import { toggleFullSizeMap } from "./features/utilsSlice";

function App() {
  const globalClasses = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { isActive } = useSelector((store) => store.newProject);
  const { renderMainPage } = useDeterminePageSize();
  const [getProjectTrigger, getProjectsData] = useLazyGetProjectsQuery();
  const [offset, setOffset] = useState(0);
  const hideMap = null;

  useEffect(() => {
    getProjectTrigger();
  }, []);

  useEffect(() => {
    if (isActive) dispatch(toggleFullSizeMap(true));
  }, [isActive]);

  useEffect(() => {
    if (getProjectsData.isUninitialized) return;
    const { data, error, isLoading, isFetching, isSuccess } = getProjectsData;

    dispatch(setStatus({ error, isLoading, isFetching, isSuccess }));

    if (data) dispatch(setProjects(data.records));
    if (data?.offset) setOffset(data.offset);
    else setOffset(0);
  }, [getProjectsData.isFetching]);

  useEffect(() => {
    if (!offset) return;
    getProjectTrigger({ offset });
  }, [offset]);

  return (
    <div className={globalClasses.main}>
      <ToastContainer position="top-center" />

      {width > 890 ? (
        <>
          <Navbar />
          <div className={globalClasses.lgScreen}>
            {renderMainPage && <MainPage />}
            <MapPage />
          </div>
        </>
      ) : (
        <div className={globalClasses.smScreen}>
          {!hideMap ? (
            <>
              <Navbar />
              {width < 750 && <BottomNav />}
              <div className={globalClasses.smScreenMainPage}>
                <MainPage />
              </div>
            </>
          ) : (
            <MapPage />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
