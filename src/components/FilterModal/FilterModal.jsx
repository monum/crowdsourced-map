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
} from "@mui/material";
import { CloseRounded, FilterAltOffRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useStyles from "./styles";
import { useWindowSize } from "../../hooks";
import { SearchProjects, Sort } from "../";
import {
  setFilteredData,
  setNameFilters,
  setNeighborhoodFilters,
} from "../../features/projects/projectsSlice";

const FilterModal = ({ open, setOpen, onClose }) => {
  const { breakPoint, width } = useWindowSize();
  const classes = useStyles({ breakPoint, width });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const {
    data,
    nameFilters,
    neighborhoodFilters,
    status: { isFetching },
  } = useSelector((state) => state.projects);

  const [neighborhoodOptions, setNeighborhoodOptions] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);

  const handleClearAll = () => {
    setFilteredArr([]);
    dispatch(setFilteredData([]));
    dispatch(setNameFilters([]));
    dispatch(setNeighborhoodFilters([]));
  };

  const handleFilterData = () => {
    if (nameFilters.length <= 0 && neighborhoodFilters.length <= 0)
      return setCount(data.length);

    let filtered = [];

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
    if (isFetching) return;

    setCount(data.length);
    setNeighborhoodOptions([]);
    setNameOptions([]);

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

    return handleFilterData();
  }, [isFetching]);

  const handleShowResults = () => {
    if (!count || isFetching) return;
    setOpen(false);
    navigate("/crowdsourced-map");

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
                name
                label="Filter By Name"
                options={nameOptions}
              />
            </Box>
            <Box className={classes.section}>
              <SearchProjects
                neighborhood
                label="Filter By Neighborhood"
                options={neighborhoodOptions}
              />
            </Box>
            <Box className={classes.section}>
              <Sort />
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
