import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStyles from "./globalStyles";
import { Navbar, BottomNav } from "./components";
import { useDeterminePageSize, useWindowSize, useNetworkStatus } from "./hooks";
import { MapPage, MainPage } from "./pages/";
import { useLazyGetProjectsQuery } from "./features/projects/projectsApi";
import { setProjects, setStatus } from "./features/projects/projectsSlice";
import { toggleFullSizeMap } from "./features/utilsSlice";

const toastId = "app-page-toast";

function App() {
  const globalClasses = useStyles();
  const dispatch = useDispatch();
  const { isOnline } = useNetworkStatus();
  const { width, breakPoint } = useWindowSize();
  const { hideMap } = useSelector((store) => store.utils);
  const { isActive } = useSelector((store) => store.newProject);
  const { renderMainPage } = useDeterminePageSize();
  const [getProjectTrigger, getProjectsData] = useLazyGetProjectsQuery();
  const [offset, setOffset] = useState(0);
  const [isOffLine, setisOffLine] = useState(false);

  useEffect(() => getProjectTrigger(), []);

  useEffect(() => {
    if (!isOffLine) return;

    if (isOnline) window.location.reload();
  });

  useEffect(() => {
    if (getProjectsData.isUninitialized) return;
    const { data, error, isLoading, isFetching, isSuccess } = getProjectsData;

    if (error) {
      toast.error("Network Error, please check your connection", {
        autoClose: false,
        toastId,
      });

      setisOffLine(true);
    }

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

      {breakPoint === "lg" ? (
        <>
          <Navbar />
          <div className={globalClasses.lgScreen}>
            {renderMainPage && <MainPage />}
            <MapPage />
          </div>
        </>
      ) : (
        <div className={globalClasses.smScreen}>
          {hideMap ? (
            <div className={globalClasses.smScreenContainer}>
              <Navbar />
              {width < 750 && <BottomNav />}
              <div className={globalClasses.smScreenMainPage}>
                <MainPage />
              </div>
            </div>
          ) : (
            <div className={globalClasses.smScreenContainer}>
              <MapPage />
              <BottomNav />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
