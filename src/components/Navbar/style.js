import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  navbar: {
    marginBottom: 30,
    backgroundColor: "#ffffff",
    // height: ,
    fontWeight: "bold",
    fontSize: "1.05rem",
    flexDirection: "column",
  },
  box: {
    paddingBottom: 10,
    alignItems: "center",
    width: "60%",
    marginLeft: 25,
    justifyContent: "space-between",
    padding: "10px 0",
  },
  h1: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    width: 350,
  },
  image: {
    width: 65,
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
}));
