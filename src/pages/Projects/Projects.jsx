// imports from installed modules
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { useEffect, useState, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";

// imports from local files
import useStyles from "./styles";
import { Project } from "../../components";
import { useDeterminePageSize, useWindowSize } from "../../hooks";

const Projects = () => {
  const { width } = useWindowSize();
  const { breakPoint } = useWindowSize();
  const { renderMainPage } = useDeterminePageSize();

  const classes = useStyles({ breakPoint });

  return (
    <div className={classes.main}>
      {breakPoint === "lg" && (
        <header className={classes.header}>
          <Typography
            variant="h4"
            component="h1"
            fontSize={width < 1155 && renderMainPage && 22}
          >
            Submitted Projects
          </Typography>
        </header>
      )}

      <ProjectsContainer />
    </div>
  );
};

const ProjectsContainer = () => {
  const { breakPoint } = useWindowSize();
  const { renderFullMap } = useDeterminePageSize();
  const { data, status, filteredData } = useSelector((store) => store.projects);

  const lazyRef = useRef(false);
  const pageSize = [...Array(50).keys()];
  const classes = useStyles({ breakPoint });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (status.isFetching && !status.isLoading) setShowLoader(true);
    else setShowLoader(false);
  }, [status.isFetching]);

  return (
    <Box className={classes.projectsContainer}>
      {filteredData.length > 0 && (
        // show the filtered data
        <Grid container spacing={4}>
          {filteredData.map(({ id, fields }) => (
            <Project key={id} projectInfo={{ id, fields }} />
          ))}
        </Grid>
      )}

      {!filteredData.length > 0 && (
        // show unfiltered data
        <Grid container spacing={4}>
          {status.isLoading || status.error
            ? pageSize.map((_, i) => (
                <Project key={i} skeleton projectInfo={{}} />
              ))
            : data.map(({ id, fields }) => (
                <Project key={id} projectInfo={{ id, fields }} />
              ))}
        </Grid>
      )}

      <div ref={lazyRef} style={{ width: 1, height: 1, marginTop: 50 }}></div>

      {showLoader && (
        <SyncLoader
          size={breakPoint === "sm" ? 11 : 13}
          margin={10}
          style={
            renderFullMap || breakPoint === "sm"
              ? { margin: "20px 0 15px 32%" }
              : { margin: "20px 0 15px 45%" }
          }
        />
      )}
    </Box>
  );
};

export default Projects;
