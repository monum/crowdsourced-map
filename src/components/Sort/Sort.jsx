import { useState, useEffect } from "react";
import { FormControl, Select, InputLabel, MenuItem, Grow } from "@mui/material";

import useStyles from "./styles";

const Sort = () => {
  const classes = useStyles();
  const [sort, setSort] = useState("");
  const [delayedEffect, setDelayedEffect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedEffect(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Grow in={delayedEffect}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          variant="standard"
          className={classes.select}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="Size">Size</MenuItem>
          <MenuItem value="Top">Top</MenuItem>
          <MenuItem value="Recent">Most Recent</MenuItem>
        </Select>
      </FormControl>
    </Grow>
  );
};

export default Sort;
