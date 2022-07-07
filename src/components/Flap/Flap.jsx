import { Button } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

import useStyles from "./styles";

const Flap = ({ setMapIsActive, mapIsActive }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.flap}
      onClick={() => setMapIsActive((state) => !state)}
    >
      <Button sx={{ padding: "0 0 15px 0" }} variant="contained" color="white">
        {mapIsActive ? (
          <ArrowDropUp fontSize="large" />
        ) : (
          <ArrowDropDown fontSize="large" />
        )}
      </Button>
    </div>
  );
};

export default Flap;
