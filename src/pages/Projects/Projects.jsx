import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Box, Grid, Typography, Button } from "@mui/material";

import useStyles from "./styles";
import { useDeterminePageSize } from "../../hooks";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { Project, Sort, SearchProjects } from "../../components";

const Projects = () => {
  const classes = useStyles();
  const { renderFullMap } = useDeterminePageSize();
  const [delayedEffect, setDelayedEffect] = useState(!renderFullMap);

  useEffect(() => {
    if (delayedEffect) return setDelayedEffect(!renderFullMap);
    setTimeout(() => {
      setDelayedEffect(!renderFullMap);
    }, 350);
  }, [renderFullMap]);

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <Typography variant="h4" component="h1">
          Submitted Projects
        </Typography>
        {delayedEffect && <Sort />}

        {delayedEffect && <SearchProjects />}
      </header>
      <ProjectsContainer />
    </div>
  );
};

const ProjectsContainer = () => {
  const classes = useStyles();
  const pageSize = [9];
  const [offset, setOffset] = useState(null);
  const { renderFullMap } = useDeterminePageSize();

  const handleLoadMore = () => {
    setOffset(data.offset);
  };

  const { data, error, isLoading, isFetching, isSuccess } = useGetProjectsQuery(
    { offset }
  );
  const [projectsData, setprojectsData] = useState([]);

  useEffect(() => {
    if (!data || isFetching) return;

    for (let d of projectsData) {
      if (data.records.find((r) => r.id === d.id)) return;
    }

    setprojectsData((oldData) => [...oldData, ...data?.records]);
  }, [isFetching]);

  return (
    <Box className={classes.projectsContainer}>
      <Grid container rowSpacing={7} columnSpacing={4}>
        {data
          ? projectsData.map(({ id, fields }) => (
              <Project key={id} projectInfo={fields} />
            ))
          : [0, 0, 0].map((_, i) => <Project key={i} skeleton />)}
      </Grid>
      {isSuccess && data?.offset && (
        <Button
          variant="outlined"
          sx={{ margin: "50px 0 0 20%", width: "50%", padding: "10px 0" }}
          startIcon={!isFetching && <ExpandMoreRounded />}
          onClick={handleLoadMore}
        >
          {isFetching ? <SyncLoader size={10} margin={6} /> : "See More"}
        </Button>
      )}
    </Box>
  );
};

export default Projects;
