import { Fab, Tooltip, ClickAwayListener } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { useEffect, useState } from "react";
import { setPreviousLocation } from "../../features/utilsSlice";
import { toggleSuggestingProject } from "../../features/projects/newProjectSlice";

const SuggestProjectButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

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
    navigate("/crowdsourced-map/suggest-a-project");
  };

  return (
    <div
      className={classes.buttonContainer}
      onClick={() => dispatch(toggleSuggestingProject(true))}
    >
      <div onClick={handleRedirect}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Tooltip
            title="Suggest a new Project"
            open={open}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            arrow
          >
            <Fab color="white" aria-label="Suggest a new Project">
              <Add />
            </Fab>
          </Tooltip>
        </ClickAwayListener>
      </div>
    </div>
  );
};

export default SuggestProjectButton;
