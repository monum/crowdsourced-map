import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  homeContainer: {
    width: "100%",
    paddingBottom: 100,
  },
  suggestProjectButton: {
    width: "30%",
    textDecoration: "none",
    padding: "20px 0",
  },
  welcomeText: {
    width: "70%",
    textAlign: "center",
  },
  spanText: {
    color: `${theme.palette.primary.light}`,
  },
}));
