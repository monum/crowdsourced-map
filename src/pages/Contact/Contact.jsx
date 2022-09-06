// imports from installed modules
import {
  EmailRounded,
  PhoneRounded,
  GitHub,
  BugReportRounded,
} from "@mui/icons-material";
import { Paper, Divider, Typography, Box } from "@mui/material";

// imports from local files
import useStyles from "./style";
import config from "../../app-config.json";
import { useDeterminePageSize, useWindowSize } from "../../hooks";

const Contact = () => {
  const { breakPoint } = useWindowSize();
  const { renderFullMap } = useDeterminePageSize();
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
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
                href={config.repository}
              >
                <div className={classes.icon}>
                  <GitHub /> GitHub Repository
                </div>
              </a>

              <a
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
                href={`${config.repository}/issues`}
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
