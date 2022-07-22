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

import useStyles from "./styles";
import { SearchProjects, Sort } from "../";

const FilterModal = ({ open, onClose }) => {
  const classes = useStyles();

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
              <SearchProjects />
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
              startIcon={<FilterAltOffRounded />}
              className={classes.clearButton}
            >
              Clear All
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Modal>
  );
};

export default FilterModal;
