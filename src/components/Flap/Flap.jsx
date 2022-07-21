import { Button } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { toggleFullSizeMap } from "../../features/utilsSlice";

const Flap = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fullSizeMap } = useSelector((state) => state.utils);

  return (
    <div className={classes.flap} onClick={() => dispatch(toggleFullSizeMap())}>
      <Button sx={{ padding: "0 0 15px 0" }} variant="contained" color="white">
        {fullSizeMap ? (
          <ArrowDropUp fontSize="large" />
        ) : (
          <ArrowDropDown fontSize="large" />
        )}
      </Button>
    </div>
  );
};

export default Flap;
