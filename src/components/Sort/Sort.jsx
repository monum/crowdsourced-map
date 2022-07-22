import { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

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
    <FormControl>
      <FormLabel>Sort By: </FormLabel>
      <RadioGroup
        aria-labelledby="Sort Projects"
        defaultValue="top"
        name="Sort Projects"
      >
        <FormControlLabel value="size" control={<Radio />} label="Size" />
        <FormControlLabel value="top" control={<Radio />} label="Top" />
        <FormControlLabel
          value="recent"
          control={<Radio />}
          label="Most Recent"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Sort;
