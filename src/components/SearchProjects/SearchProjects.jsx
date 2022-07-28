import {
  Autocomplete,
  TextField,
  Grid,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

import useStyles from "./styles";
import {
  setNameFilters,
  setNeighborhoodFilters,
} from "../../features/projects/projectsSlice";

const SearchProjects = ({ neighborhood, name, options, label }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    nameFilters,
    neighborhoodFilters,
    status: { isFetching },
  } = useSelector((state) => state.projects);

  const handleSelect = (value) => {
    let repeatEntry;

    if (repeatEntry || !value.name) return;
    if (name) {
      repeatEntry = nameFilters.find((project) => project === value.name);

      if (repeatEntry) return;
      dispatch(setNameFilters([...nameFilters, value.name]));
    } else if (neighborhood) {
      repeatEntry = neighborhoodFilters.find(
        (project) => project === value.name
      );

      if (repeatEntry) return;
      dispatch(setNeighborhoodFilters([...neighborhoodFilters, value.name]));
    }
  };

  const projects = name ? nameFilters : neighborhood ? neighborhoodFilters : [];

  const handleRemove = (item) => {
    let newFilter = [];
    console.log(item);
    if (name) {
      newFilter = nameFilters.filter((name) => name !== item);
      dispatch(setNameFilters(newFilter));
    } else if (neighborhood) {
      newFilter = neighborhoodFilters.filter((name) => name !== item);
      dispatch(setNeighborhoodFilters(newFilter));
    }
  };

  return (
    <div>
      <SearchButton
        handleSelect={handleSelect}
        options={options}
        label={label}
        isFetching={isFetching}
      />
      <Grid container rowSpacing={2} columnSpacing={2}>
        {projects.map((name, id) => (
          <Grid key={id} item lg={4} md={6} sm={6}>
            <Paper className={classes.searched}>
              <Typography noWrap className={classes.searchedText}>
                {name}
              </Typography>
              <IconButton onClick={() => handleRemove(name)}>
                <CloseRounded />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const SearchButton = ({ handleSelect, options, label, isFetching }) => {
  const classes = useStyles();
  const [showLoader, setShowLoader] = useState(false);
  return (
    <Autocomplete
      loading={isFetching}
      options={isFetching ? [] : options}
      getOptionLabel={(option) => option.name}
      className={classes.searchBar}
      onChange={(_, value) => handleSelect(value)}
      onFocus={() => setShowLoader(true)}
      onBlur={() => setShowLoader(false)}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,

            endAdornment: (
              <>
                {isFetching && showLoader ? (
                  <SyncLoader color="#0C2639" size={6} margin={3} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchProjects;
