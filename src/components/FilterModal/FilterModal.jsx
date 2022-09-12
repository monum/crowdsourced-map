// imports from installed modules
import {
  Modal,
  Slide,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Box,
  CardActions,
  Button,
  Divider,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CloseRounded, FilterAltOffRounded } from "@mui/icons-material";

// imports from local files
import {
  setFilteredData,
  setNameFilters,
  setNeighborhoodFilters,
} from "../../features/projects/projectsSlice";

import useStyles from "./styles";
import config from "../../app-config.json";
import { SearchProjects } from "../";
import { useWindowSize } from "../../hooks";

const FilterModal = ({ open, setOpen, onClose }) => {
  const {
    data,
    nameFilters,
    neighborhoodFilters,
    status: { isFetching },
  } = useSelector((store) => store.projects);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { breakPoint, width } = useWindowSize();
  const classes = useStyles({ breakPoint, width });

  const [count, setCount] = useState(0);
  const [nameOptions, setNameOptions] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState([]);

  const handleClearAll = () => {
    // clear filter parameters and filtered projects
    setFilteredArr([]);
    dispatch(setFilteredData([]));
    dispatch(setNameFilters([]));
    dispatch(setNeighborhoodFilters([]));
  };

  const handleFilterData = () => {
    // use filter parameters to get the projects that match
    if (nameFilters.length <= 0 && neighborhoodFilters.length <= 0)
      return setCount(data.length);

    let filtered = [];

    // filter all the projects with the title and neighborhood filteres
    if (nameFilters.length > 0 && neighborhoodFilters.length > 0) {
      nameFilters.forEach((title) => {
        neighborhoodFilters.forEach((neighborhood) => {
          const found = data.filter(
            ({ fields: { Title, Neighborhood } }) =>
              Title === title && Neighborhood === neighborhood
          );

          if (found) filtered = [...filtered, ...found];
        });
      });
    } else if (nameFilters.length > 0) {
      nameFilters.forEach((title) => {
        const found = data.filter(({ fields: { Title } }) => Title === title);

        if (found) filtered = [...filtered, ...found];
      });
    } else if (neighborhoodFilters.length > 0) {
      neighborhoodFilters.forEach((neighborhood) => {
        const found = data.filter(
          ({ fields: { Neighborhood } }) => Neighborhood === neighborhood
        );

        if (found) filtered = [...filtered, ...found];
      });
    }

    setFilteredArr(filtered);
    setCount(filtered.length);
  };

  useEffect(() => {
    handleFilterData();
  }, [nameFilters, neighborhoodFilters]);

  useEffect(() => {
    // set the options for autocomplete
    if (isFetching) return;

    setNameOptions([]);
    setCount(data.length);
    setNeighborhoodOptions([]);

    // the "optionsLog" helps ensure there are no repeat entries
    const optionsLog = [];
    data.forEach(({ fields: { Title, Neighborhood } }, i) => {
      const repeatEntry = optionsLog.find(
        (item) => item === Title || item === Neighborhood
      );

      if (repeatEntry) return;

      optionsLog.push(Title);
      optionsLog.push(Neighborhood);

      setNameOptions((state) => state.concat([{ name: Title, id: i }]));
      setNeighborhoodOptions((state) =>
        state.concat([{ name: Neighborhood, id: i }])
      );
    });

    handleFilterData();
  }, [isFetching]);

  const handleShowResults = () => {
    // show the results for the data that match the filter parameters
    if (!count || isFetching) return;
    setOpen(false);
    navigate(config.homepage);

    if (nameFilters.length === 0 && neighborhoodFilters.length === 0) {
      return handleClearAll();
    } else {
      dispatch(setFilteredData(filteredArr));
    }
  };

  return (
    <Modal open={open} onClose={onClose} keepMounted>
      <Slide in={open} direction="up">
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title="Filters"
            action={
              <IconButton onClick={onClose}>
                {" "}
                <CloseRounded />
              </IconButton>
            }
          />
          <CardContent
            sx={{ padding: "10px 25px" }}
            className={classes.cardContent}
          >
            <Box className={classes.section}>
              <SearchProjects
                neighborhood
                label="Filter By Neighborhood"
                options={neighborhoodOptions}
              />
            </Box>
            <Divider />
            <Box className={classes.section}>
              <SearchProjects
                name
                label="Filter By Title"
                options={nameOptions}
              />
            </Box>
          </CardContent>
          <CardActions
            sx={{ paddingLeft: "10px" }}
            className={classes.cardFooter}
          >
            <Button
              disableFocusRipple
              disableElevation
              onClick={() => handleClearAll()}
              startIcon={<FilterAltOffRounded />}
              className={classes.clearButton}
            >
              Clear All
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleShowResults()}
              disabled={isFetching || !count}
            >
              Show results ({count})
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Modal>
  );
};

export default FilterModal;
