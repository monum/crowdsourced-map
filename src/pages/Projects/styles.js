import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  main: {
    marginLeft: 40,
    overflowY: "scroll",
    // background: "red",
  },
  header: {
    display: "flex",
    width: "100%",
    minWidth: 750,
    paddingRight: 30,
    justifyContent: "space-between",
    alignItems: "end",
    color: theme.palette.primary.light,
    borderBottom: `3px solid ${theme.palette.primary.light}`,
    paddingBottom: 10,
    marginBottom: 20,
  },

  projectsContainer: {
    marginRight: 30,
    // overflow: "scroll",
    // background: "red",
  },
}));
