import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./styles";
import { locationSelected } from "../../features/locations/locationsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { locationsData } = useSelector((state) => state.location);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setOptions(locationsData?.map((data) => data.label));

    return () => {
      isMounted = false;
    };
  }, [locationsData]);

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        options={options}
        onSelect={(e) => dispatch(locationSelected(e.target.value))}
        getOptionLabel={(option) => option.name}
        className={classes.searchBar}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Search Boston Neighborhoods"
          />
        )}
      />
    </div>
  );
};

export default Search;
