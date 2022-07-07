import { Grow, Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import useStyles from "./styles";

const SearchProjects = ({ options }) => {
  const classes = useStyles();
  const [delayedEffect, setDelayedEffect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedEffect(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Grow in={delayedEffect}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        className={classes.searchBar}
        renderInput={(params) => (
          <TextField variant="standard" {...params} label="Search Projects" />
        )}
      />
    </Grow>
  );
};

export default SearchProjects;
