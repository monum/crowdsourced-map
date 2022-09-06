// imports from installed modules
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";

// imports from local files
import useStyles from "./styles";
import { locationSelected } from "../../features/locations/locationsSlice";

const SearchLocation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { locationsData } = useSelector((state) => state.location);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    // set the autocomplete options
    setOptions(locationsData?.map((data) => data.label));
  }, [locationsData]);

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        options={options}
        onChange={(_, value) => dispatch(locationSelected(value.name))}
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

export default SearchLocation;
