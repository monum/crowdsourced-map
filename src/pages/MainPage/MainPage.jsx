import { Routes, Route } from "react-router-dom";

import { Navbar } from "../../components";
import { About, Projects, SuggestProject, Home, Contact } from "../";
import useStyles from "./styles";
import { useDeterminePageSize } from "../../hooks";

const MainPage = ({ mapIsActive }) => {
  const { mainPageSize } = useDeterminePageSize(mapIsActive);
  const classes = useStyles({ mainPageSize });

  const renderBigPage = mainPageSize === 70 ? false : true;

  return (
    <div className={classes.mainPage}>
      <Navbar renderBigPage={renderBigPage} />
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
          element={<SuggestProject />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default MainPage;
