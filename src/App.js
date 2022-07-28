import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import useStyles from "./globalStyles";
import { Navbar } from "./components";
import { useDeterminePageSize } from "./hooks";
import { MapPage, MainPage } from "./pages/";
import { useLazyGetProjectsQuery } from "./features/projects/projectsApi";
import { setProjects, setStatus } from "./features/projects/projectsSlice";

function App() {
  const globalClasses = useStyles();
  const dispatch = useDispatch();
  const { renderMainPage } = useDeterminePageSize();
  const [getProjectTrigger, getProjectsData] = useLazyGetProjectsQuery();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getProjectTrigger();
  }, []);

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
      <Navbar />
      <div className={globalClasses.app}>
        {renderMainPage && <MainPage />}
        <MapPage />
      </div>
    </div>
  );
}

export default App;
