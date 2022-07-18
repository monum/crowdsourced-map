import { Grow, Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import useStyles from "./styles";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";

const SearchProjects = () => {
  const [delayedEffect, setDelayedEffect] = useState(false);
  const [options, setOptions] = useState([]);

  const { data, isSuccess } = useGetProjectsQuery();
  const classes = useStyles();

  useEffect(() => {
    if (!isSuccess) return;

    const optionsLog = [];
    setOptions([]);

    data?.records.forEach(({ fields: { Title } }, i) => {
      const repeatEntry = optionsLog.find((item) => item === Title);

      if (repeatEntry) return false;

      optionsLog.push(Title);
      setOptions((state) => state.concat([{ name: Title, id: i }]));
    });
  }, [data]);

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
