import { useEffect, useState, useRef } from "react";
import { SyncLoader } from "react-spinners";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import useStyles from "./styles";
import { useDeterminePageSize, useIsInViewport } from "../../hooks";
import { Project } from "../../components";

const Projects = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <Typography variant="h4" component="h1">
          Submitted Projects
        </Typography>
      </header>
      <ProjectsContainer />
    </div>
  );
};

const ProjectsContainer = () => {
  const classes = useStyles();
  const pageSize = [...Array(15).keys()];
  // const [offset, setOffset] = useState(null);
  const { renderFullMap } = useDeterminePageSize();
  const lazyRef = useRef(false);

  // const { isIntersecting: loadMore } = useIsInViewport(lazyRef);

  const { data, status, filteredData } = useSelector((store) => store.projects);

  useEffect(() => {
    if (status.isFetching && !status.isLoading) setShowLoader(true);
    else setShowLoader(false);
  }, [status.isFetching]);

  const [showLoader, setShowLoader] = useState(false);

  // const [projectsData, setprojectsData] = useState([]);

  // useEffect(() => {
  //   if (!loadMore || !data) return;
  //   setOffset(data.offset);
  // }, [loadMore]);

  // useEffect(() => {
  //   if (!data || isFetching) return;

  //   // dispatch(setProjects(data));
  //   for (let d of projectsData) {
  //     if (data.records.find((r) => r.id === d.id)) return;
  //   }

  //   setprojectsData((oldData) => [...oldData, ...data?.records]);

  //   if (data.offset) setShowLoader(true);
  //   else setShowLoader(false);
  // }, [isFetching]);

  return (
    <Box className={classes.projectsContainer}>
      {filteredData.length > 0 && (
        <Grid container rowSpacing={7} columnSpacing={4}>
          {filteredData.map(({ id, fields }) => (
            <Project key={id} projectInfo={fields} />
          ))}
        </Grid>
      )}

      {!filteredData.length > 0 && (
        <Grid container rowSpacing={7} columnSpacing={4}>
          {!status.isLoading
            ? data.map(({ id, fields }) => (
                <Project key={id} projectInfo={fields} />
              ))
            : pageSize.map((_, i) => <Project key={i} skeleton />)}
        </Grid>
      )}

      <div ref={lazyRef} style={{ width: 1, height: 1, marginTop: 50 }}></div>

      {showLoader && (
        <SyncLoader
          size={13}
          margin={10}
          style={
            renderFullMap
              ? { margin: "0 0 15px 32%" }
              : { margin: "0 0 15px 45%" }
          }
        />
      )}
    </Box>
  );
};

export default Projects;
