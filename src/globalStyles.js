import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  main: {
    overflow: "hidden",
    height: "100vh",
  },
  lgScreen: {
    overflow: "hidden",
    display: "flex",
    marginTop: 72,
    height: "calc(100vh - 72px)",
  },
  smScreen: {
    // marginTop: 72,
    height: "100vh",
  },
  smScreenMainPage: {
    marginTop: 72,
  },
}));
