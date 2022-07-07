import { Box, Grid, Typography } from "@mui/material";

import useStyles from "./styles";
import { Project, Sort } from "../../components";
import image from "../../images/pic1.jpg";
import SearchProjects from "../../components/SearchProjects/SearchProjects";
import { useEffect, useState } from "react";

const projects = [
  {
    image,
    title: "New Compost Bin",
    location: "15 Downtown Boston, MA 02116",
    timeSubmitted: new Date(),
  },
  {
    image,
    title: "New Compost Bin",
    location: "15 Downtown Boston, MA 02116",
    timeSubmitted: new Date(),
  },
  {
    image,
    title: "New Compost Bin",
    location: "15 Downtown Boston, MA 02116",
    timeSubmitted: new Date(),
  },
  {
    image,
    title: "New Compost Bin",
    location: "15 Downtown Boston, MA 02116",
    timeSubmitted: new Date(),
  },
  {
    image,
    title: "New Compost Bin",
    location: "15 Downtown Boston, MA 02116",
    timeSubmitted: new Date(),
  },
  {
    image,
    title: "New Bench",
    location: "15 Downtown Boston, MA 02116",
    timeSubmitted: new Date(),
  },
];

const options = [];

projects.forEach(({ title }, i) => {
  const repeatEntry = options.find(({ name }) => name === title);

  if (repeatEntry) return false;

  options.push({ name: title, id: i });
});

const Projects = ({ renderBigPage }) => {
  const classes = useStyles();
  const [delayedEffect, setDelayedEffect] = useState(!renderBigPage);

  useEffect(() => {
    if (delayedEffect) return setDelayedEffect(!renderBigPage);
    setTimeout(() => {
      setDelayedEffect(!renderBigPage);
    }, 350);
  }, [renderBigPage]);

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <Typography variant="h4" component="h1">
          Submitted Projects
        </Typography>
        {delayedEffect && <Sort />}

        {delayedEffect && <SearchProjects options={options} />}
      </header>

      <Box className={classes.projectsContainer}>
        <Grid container rowSpacing={7} columnSpacing={4}>
          {projects.map((project, i) => (
            <Project
              key={i}
              projectInfo={project}
              renderBigPage={renderBigPage}
            />
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Projects;
