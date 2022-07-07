import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  navbar: {
    marginBottom: 30,
    backgroundColor: "#ffffff",
    height: 80,
    fontWeight: "bold",
    fontSize: "1.05rem",
    flexDirection: "column",
  },
  box: {
    gap: "22%",
    alignItems: "center",
    minWidth: 600,
    margin: "5px 0  0 30px",
  },
  h1: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
  },
  image: {
    width: 65,
    marginBottom: 5,
  },
  nav: {
    display: "flex",
    gap: 35,
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
