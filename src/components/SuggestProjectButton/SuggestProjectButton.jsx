import { Fab, Tooltip, ClickAwayListener } from "@mui/material";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { useEffect, useState } from "react";
import { setPreviousLocation } from "../../features/utilsSlice";
import {
  toggleSuggestingProject,
  resetProjectDetails,
} from "../../features/projects/newProjectSlice";

const SuggestProjectButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { isActive } = useSelector((store) => store.newProject);
  const { previousLocation } = useSelector((store) => store.utils);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isMounted = true;

    setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRedirect = () => {
    dispatch(setPreviousLocation(location));
    dispatch(toggleSuggestingProject(true));
    navigate("/crowdsourced-map/suggest-a-project");
  };

  const handleClose = () => {
    dispatch(resetProjectDetails());
    dispatch(toggleSuggestingProject(false));
    navigate(previousLocation.pathname);
  };

  return (
    <div className={classes.buttonContainer}>
      <div>
        {!isActive && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip
              title="Suggest a new Project"
              open={open}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              arrow
            >
              <Fab
                color="white"
                aria-label="Suggest a new project"
                onClick={handleRedirect}
              >
                <AddRounded />
              </Fab>
            </Tooltip>
          </ClickAwayListener>
        )}

        {isActive && (
          <Fab
            color="white"
            aria-label="Suggest a new Project"
            onClick={handleClose}
          >
            <CloseRounded />
          </Fab>
        )}
      </div>
    </div>
  );
};

export default SuggestProjectButton;
