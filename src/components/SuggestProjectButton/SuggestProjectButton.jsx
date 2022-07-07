import { Fab, Tooltip, ClickAwayListener } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import { useEffect, useState } from "react";

const SuggestProjectButton = () => {
  const classes = useStyles();
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

  return (
    <div className={classes.buttonContainer}>
      <Link to="/projects/suggest-a-project">
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
      </Link>
    </div>
  );
};

export default SuggestProjectButton;
