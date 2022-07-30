import { Paper, Divider, Typography } from "@mui/material";

import useStyles from "./style";

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h4" style={{ marginBottom: "10px" }}>
          About This Project
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Typography component="body" paragraph>
          As a research and development office in city government, we support
          several community engagement efforts that seek to collect and share
          feedback from residents on various City initiatives. Many of these
          engagement efforts are citywide and revolve around geospatial
          questions, such as:
          <ul className={classes.list}>
            <li>Where should the city install new benches</li>
            <li>Where is your favorite public art</li>
            <li>Where would you like to see a new piece of public art</li>
            <li>Where would you like to see a new community compost bin</li>
          </ul>
          Based on this need we decided to build a tool that lets users deploy
          interactive maps that crowdsource ideas from residents. This
          interactive map allows residents to suggest ideas while being able to
          accurately pin point the location they'd like to see said projects.
          Residents can also see other exciting projects that have been approved
          for implementation by the city. This app was built with simplicity in
          mind but if there is a feature you are not sure how to use, please
          read the{" "}
          <span>
            {" "}
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              project wiki
            </a>{" "}
          </span>
          . If you'd like to contibute to this project or have any issues you
          would like to report check out the{" "}
          <span>
            {" "}
            <a
              href="https://github.com/monum/crowdsourced-map"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              repository
            </a>{" "}
          </span>
        </Typography>
      </Paper>
    </div>
  );
};

export default About;
