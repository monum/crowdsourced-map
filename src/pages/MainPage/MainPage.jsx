// imports from installed modules
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

// imports from local files
import useStyles from "./styles";
import config from "../../app-config.json";
import { About, Projects, SuggestProject, Contact } from "../";
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import { toggleSuggestingProject } from "../../features/suggestProject/newProjectSlice";

const MainPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { mainPageSize } = useDeterminePageSize();
  const classes = useStyles({ mainPageSize, width });

  useEffect(() => {
    if (location.pathname !== `${config.homepage}/suggest-a-project`)
      dispatch(toggleSuggestingProject(false));
    else dispatch(toggleSuggestingProject(true));
  }, [location.pathname]);

  return (
    <div className={classes.mainPage}>
      <Routes>
        <Route path={config.homepage} element={<Projects />} />
        <Route
          path={`${config.homepage}/suggest-a-project`}
          element={<SuggestProject />}
        />
        <Route path={`${config.homepage}/about`} element={<About />} />
        <Route path={`${config.homepage}/contact`} element={<Contact />} />
      </Routes>
    </div>
  );
};

export default MainPage;
