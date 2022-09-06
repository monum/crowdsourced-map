import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import { Fab, Tooltip, ClickAwayListener } from "@mui/material";

import {
  toggleSuggestingProject,
  resetProjectDetails,
} from "../../features/suggestProject/newProjectSlice";

import useStyles from "./styles";
import config from "../../app-config.json";
import { useEffect, useState } from "react";
import { setPreviousLocation } from "../../features/utilsSlice";
import { useDeterminePageSize, useWindowSize } from "../../hooks";

const SuggestProjectButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const { width, breakPoint } = useWindowSize();
  const { renderFullMap } = useDeterminePageSize();
  const { isActive } = useSelector((store) => store.newProject);
  const { previousLocation } = useSelector((store) => store.utils);
  const [delayedEffect, setDelayedEffect] = useState(renderFullMap);

  useEffect(() => {
    // move the button according to screen size
    setTimeout(() => setDelayedEffect(renderFullMap), 100);
  }, [renderFullMap]);

  const classes = useStyles({ delayedEffect, width, breakPoint });

  useEffect(() => {
    // open the tool tip on load
    setTimeout(() => setOpen(true), 5000);
  }, []);

  const handleSuggestProject = () => {
    // navigate to the form for suggesting a project
    dispatch(setPreviousLocation(location));
    dispatch(toggleSuggestingProject(true));
    navigate(`${config.homepage}/suggest-a-project`);
  };

  const handleClose = () => {
    // clear all data and stop the suggesting project process
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
                onClick={handleSuggestProject}
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
