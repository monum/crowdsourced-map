import {
  Autocomplete,
  TextField,
  Grid,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CloseRounded } from "@mui/icons-material";

import useStyles from "./styles";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";

const SearchProjects = () => {
  const [projects, setProjects] = useState([]);
  const classes = useStyles();

  const handleSelect = (value) => {
    const repeatEntry = projects.find((project) => project === value);

    if (repeatEntry || !value.name) return;
    setProjects((state) => [...state, value]);
  };

  return (
    <div>
      <SearchButton handleSelect={handleSelect} />
      <Grid container rowSpacing={2} columnSpacing={2}>
        {projects.map(({ name, id }) => (
          <Grid key={id} item lg={4} md={6} sm={6}>
            <Paper className={classes.searched}>
              <Typography noWrap className={classes.searchedText}>
                {name}
              </Typography>
              <IconButton>
                <CloseRounded />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const SearchButton = ({ handleSelect }) => {
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

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      className={classes.searchBar}
      onChange={(_, value) => handleSelect(value)}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          label="Filter By Project name"
        />
      )}
    />
  );
};

export default SearchProjects;
