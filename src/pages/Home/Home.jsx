import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { setPreviousLocation } from "../../features/utilsSlice";
import { toggleSuggestingProject } from "../../features/projects/newProjectSlice";

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleRedirect = () => {
    dispatch(setPreviousLocation(location));
    navigate("projects/suggest-a-project");
  };

  return (
    <div className={classes.homeContainer}>
      <Typography
        variant="h2"
        component="h1"
        className={classes.welcomeText}
        sx={{ fontWeight: 500, margin: "30px auto", textAlign: "center" }}
      >
        <span className={classes.spanText}>Hello,</span> Welcome to{" "}
        <span className={classes.spanText}>Boston Maps</span>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={classes.suggestProjectButton}
        sx={{ margin: "40px 35% 0 35%", padding: "10px 0" }}
        onClick={handleRedirect}
      >
        Suggest an Idea
      </Button>

      {/* <Typography
          variant="subtitle1"
          sx={{ margin: "auto", width: "50%", fontSize: 23 }}
        ></Typography> */}
    </div>
  );
};

export default Home;
