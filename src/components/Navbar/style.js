import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  navbar: {
    marginBottom: 30,
    backgroundColor: "#ffffff",
    fontWeight: "bold",
    fontSize: "1.05rem",
    flexDirection: "column",
  },
  box: {
    width: "80%",
    marginLeft: 25,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px 0",
  },
  h1: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    width: 350,
  },
  image: {
    width: 58,
  },
  nav: {
    display: "flex",
    gap: 35,
    justifyContent: "center",
    margin: "15px 0 10px 0",
    fontWeight: "bold",
    fontSize: "1.05rem",
  },

  navLink: {
    textDecoration: "none",
    color: theme.palette.gray.dark,
    wordWrap: "nowrap",
    transition: theme.transitions.presets.color,
  },
  isActive: {
    color: theme.palette.primary.light,
  },

  filterIcon: {
    display: "flex",
    flexDirection: "column",
    gap: -5,
    height: 1,
  },

  filterButton: {
    display: "flex",
  },
}));
