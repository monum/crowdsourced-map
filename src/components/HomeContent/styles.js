import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    width: "90%",
    margin: "auto",
    marginTop: 30,
  },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
    marginTop: 50,
    gap: 30,
  },
  about: {
    padding: 16,
    cursor: "pointer",
  },
  aboutLink: {
    color: `${theme.palette.primary.light}`,
  },
}));
