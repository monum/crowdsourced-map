import { Typography, Divider, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Project } from "../";
import useStyles from "./styles";
import { useEffect, useState } from "react";

const HomeContent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { data, status } = useSelector((store) => store.projects);

  const [neededData, setNeededData] = useState([]);

  useEffect(() => {
    if (!data) return;

    const arr = [];
    for (let i = 0; i < 3; i++) {
      if (!data[i]) return;
      const { Address, Description, Date, Timestamp, ...required } = {
        ...data[i].fields,
      };
      const obj = {
        id: data[i].id,
        fields: required,
      };
      arr.push(obj);
    }

    setNeededData(arr);
  }, [data]);

  return (
    <div className={classes.container}>
      <div className={classes.projectsContainer}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Some ideas that have been suggested
        </Typography>
        <Grid container columnSpacing={5} rowSpacing={5}>
          {neededData?.map(({ id, fields }) => (
            <Project key={id} projectInfo={fields} home />
          ))}
        </Grid>
      </div>
      <Paper
        className={classes.about}
        onClick={() => navigate("/crowdsourced-map/about")}
      >
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          About This Project
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Typography component="body" paragraph>
          As a research and development office in city government, we support
          several community engagement efforts that seek to collect and share
          feedback from residents on various City initiatives. Many of these
          engagement efforts are citywide and revolve around geospatial
          questions...
          <span className={classes.aboutLink}>Read More</span>
        </Typography>
      </Paper>
    </div>
  );
};

export default HomeContent;
