// imports from installed modules
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

// imports from local files
import useStyles from "./styles";
import config from "../../app-config.json";
import { About, Projects, SuggestProject, Contact } from "../";
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import { toggleSuggestingProject } from "../../features/suggestProject/newProjectSlice";

const MainPage = () => {
  const pageRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const { breakPoint } = useWindowSize();
  const { mainPageSize } = useDeterminePageSize();
  const { status } = useSelector((store) => store.projects);
  const classes = useStyles({ mainPageSize, status, breakPoint });

  useEffect(() => {
    if (location.pathname !== `${config.homepage}/suggest-a-project`) {
      dispatch(toggleSuggestingProject(false));
    } else {
      dispatch(toggleSuggestingProject(true));
    }

    if (pageRef.current) pageRef.current.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={classes.mainPage} ref={pageRef}>
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
