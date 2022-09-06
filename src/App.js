// imports from installed modules
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

// imports from local files
import {
  useDeterminePageSize,
  useWindowSize,
  useNetworkStatus,
  useLocalStorage,
} from "./hooks";

import useStyles from "./globalStyles";
import { MapPage, MainPage } from "./pages/";
import { Navbar, BottomNav } from "./components";
import { setProjects, setStatus } from "./features/projects/projectsSlice";
import { useLazyGetProjectsQuery } from "./features/suggestProject/projectsApi";

const toastId = "app-page-toast";

function App() {
  const dispatch = useDispatch();
  const globalClasses = useStyles();
  const { isOnline } = useNetworkStatus();
  const { width, breakPoint } = useWindowSize();
  const { renderMainPage } = useDeterminePageSize();
  const { hideMap } = useSelector((store) => store.utils);
  const { setItem, getItem, remove } = useLocalStorage("refresh-count");

  const [offset, setOffset] = useState(0);
  const [isOffLine, setisOffLine] = useState(false);
  const [getProjectTrigger, getProjectsData] = useLazyGetProjectsQuery();

  useEffect(() => getProjectTrigger(), []);
  useEffect(() => {
    // attempt to continue getting projects data if internet connection is lost and then re-established
    if (!isOffLine || getItem() > 4) return remove();

    if (isOnline) {
      const currentCount = getItem() ? parseInt(getItem()) : 0;
      setItem(currentCount + 1);
      getProjectTrigger({ offset });
      toast.dismiss(toastId);
      setisOffLine(false);
    }
  });

  useEffect(() => {
    // attempt to get projects
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
