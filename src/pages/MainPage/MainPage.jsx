import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import useStyles from "./styles";
import { toggleSuggestingProject } from "../../features/projects/newProjectSlice";
import { useDeterminePageSize } from "../../hooks";
import { About, Projects, SuggestProject, Home, Contact } from "../";

const MainPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { mainPageSize } = useDeterminePageSize();
  const classes = useStyles({ mainPageSize });

  useEffect(() => {
    if (location.pathname !== "/crowdsourced-map/projects/suggest-a-project")
      dispatch(toggleSuggestingProject(false));
    else dispatch(toggleSuggestingProject(true));
  }, [location.pathname]);

  return (
    <div className={classes.mainPage}>
      <Routes>
        <Route path="/crowdsourced-map" element={<Home />} />
        <Route path="/crowdsourced-map/about" element={<About />} />
        <Route path="/crowdsourced-map/projects" element={<Projects />} />
        <Route
          path="/crowdsourced-map/projects/suggest-a-project"
          element={<SuggestProject />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default MainPage;
