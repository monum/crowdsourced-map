import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { About, Projects, SuggestProject, Home, Contact } from "../";
import useStyles from "./styles";
import { useDeterminePageSize } from "../../hooks";

const MainPage = ({ mapIsActive }) => {
  const { mainPageSize } = useDeterminePageSize(mapIsActive);
  const classes = useStyles({ mainPageSize });

  const renderBigPage = mainPageSize === 70 ? true : false;

  return (
    <div className={classes.mainPage}>
      <Routes>
        <Route path="/" element={<Home renderBigPage={renderBigPage} />} />
        <Route
          path="/about"
          element={<About renderBigPage={renderBigPage} />}
        />
        <Route
          path="/projects"
          element={<Projects renderBigPage={renderBigPage} />}
        />
        <Route
          path="/projects/suggest-a-project"
          element={<SuggestProject renderBigPage={renderBigPage} />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default MainPage;
