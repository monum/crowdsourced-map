import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStyles from "./globalStyles";
import { Navbar } from "./components";
import { useDeterminePageSize } from "./hooks";
import { MapPage, MainPage } from "./pages/";
import { useLazyGetProjectsQuery } from "./features/projects/projectsApi";
import { setProjects, setStatus } from "./features/projects/projectsSlice";
import { toggleFullSizeMap } from "./features/utilsSlice";

function App() {
  const globalClasses = useStyles();
  const dispatch = useDispatch();
  const { isActive } = useSelector((store) => store.newProject);
  const { renderMainPage } = useDeterminePageSize();
  const [getProjectTrigger, getProjectsData] = useLazyGetProjectsQuery();
  const [offset, setOffset] = useState(0);

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
      <Navbar />
      <div className={globalClasses.app}>
        {renderMainPage && <MainPage />}
        <MapPage />
      </div>
    </div>
  );
}

export default App;
