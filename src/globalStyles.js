import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  main: {
    overflow: "hidden",
    height: "100vh",
  },
  app: {
    overflow: "hidden",
    display: "flex",
    marginTop: 85,
    height: "calc(100vh - 85px)",
  },
}));
