import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import useStyles from "./styles";
import { toggleSuggestingProject } from "../../features/projects/newProjectSlice";
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import { About, Projects, SuggestProject, Contact } from "../";

const MainPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { mainPageSize } = useDeterminePageSize();
  const classes = useStyles({ mainPageSize, width });

  useEffect(() => {
    if (location.pathname !== "/crowdsourced-map/suggest-a-project")
      dispatch(toggleSuggestingProject(false));
    else dispatch(toggleSuggestingProject(true));
  }, [location.pathname]);

  return (
    <div className={classes.mainPage}>
      <Routes>
        <Route path="/crowdsourced-map" element={<Projects />} />
        <Route
          path="/crowdsourced-map/suggest-a-project"
          element={<SuggestProject />}
        />
        <Route path="/crowdsourced-map/about" element={<About />} />
        <Route path="/crowdsourced-map/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default MainPage;
