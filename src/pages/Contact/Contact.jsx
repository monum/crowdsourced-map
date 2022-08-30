import { Paper, Divider, Typography, Box } from "@mui/material";
import {
  EmailRounded,
  PhoneRounded,
  GitHub,
  BugReportRounded,
} from "@mui/icons-material";

import { useDeterminePageSize, useWindowSize } from "../../hooks";
import useStyles from "./style";

const Contact = () => {
  const { renderFullMap } = useDeterminePageSize();
  const { breakPoint } = useWindowSize();
  const classes = useStyles({ renderFullMap, breakPoint });

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h4" style={{ marginBottom: "10px" }}>
          Contact
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Box className={classes.body} component="body" paragraph>
          <div className={classes.div}>
            <Typography variant="h6" gutterBottom>
              Boston Office of New Urban Mechanics
            </Typography>
            <div className={classes.icons}>
              <div className={classes.icon}>
                <EmailRounded /> write email here
              </div>
              <div className={classes.icon}>
                <PhoneRounded /> write phone here
              </div>
            </div>
          </div>

          <div className={classes.div}>
            <Typography variant="h6" gutterBottom>
              Wanna suggest a new feature or report a problem?
            </Typography>
            <div className={classes.icons}>
              <a
                href="https://github.com/monum/crowdsourced-map"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                <div className={classes.icon}>
                  <GitHub /> GitHub Repository
                </div>
              </a>

              <a
                href="https://github.com/monum/crowdsourced-map/issues"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                <div className={classes.icon}>
                  <BugReportRounded /> Report a Bug
                </div>
              </a>
            </div>
          </div>
        </Box>
      </Paper>
    </div>
  );
};

export default Contact;
