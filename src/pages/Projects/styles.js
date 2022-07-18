import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  main: {
    marginLeft: 40,
    marginBottom: 100,
    paddingBottom: 20,
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 15,
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
    paddingTop: 5,
  },

  projectsContainer: {
    marginRight: 30,
    minHeight: "fit-content",
  },
}));
