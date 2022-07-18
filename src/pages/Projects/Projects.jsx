import { Box, Grid, Typography, Button } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

import useStyles from "./styles";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { Project, Sort, SearchProjects } from "../../components";

const Projects = ({ renderBigPage }) => {
  const classes = useStyles();
  const [delayedEffect, setDelayedEffect] = useState(renderBigPage);

  useEffect(() => {
    if (delayedEffect) return setDelayedEffect(renderBigPage);
    setTimeout(() => {
      setDelayedEffect(renderBigPage);
    }, 350);
  }, [renderBigPage]);

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <Typography variant="h4" component="h1">
          Submitted Projects
        </Typography>
        {delayedEffect && <Sort />}

        {delayedEffect && <SearchProjects />}
      </header>
      <ProjectsContainer
        renderBigPage={renderBigPage}
        delayedEffect={delayedEffect}
      />
    </div>
  );
};

const ProjectsContainer = ({ renderBigPage, delayedEffect }) => {
  const classes = useStyles();
  const pageSize = [9];
  const [projects, setProjects] = useState(useGetProjectsQuery());
  const [offset, setOffset] = useState(null);

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
              <Project
                key={id}
                projectInfo={fields}
                renderBigPage={renderBigPage}
              />
            ))
          : [0, 0, 0].map((_, i) => (
              <Project key={i} skeleton renderBigPage={renderBigPage} />
            ))}
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
