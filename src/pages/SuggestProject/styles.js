import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: ({ renderFullMap, breakPoint }) => ({
    height: renderFullMap || breakPoint !== "lg" ? "100%" : "fit-content",
  }),
  card: ({ renderFullMap, breakPoint }) => ({
    margin: "auto",
    paddingTop: renderFullMap ? 20 : 10,
    width: renderFullMap || breakPoint !== "lg" ? "100%" : "70%",
    height: "100%",
    marginTop: renderFullMap || breakPoint !== "lg" ? 0 : 70,
  }),
  form: ({ renderFullMap }) => ({
    width: "100%",
    marginTop: renderFullMap ? 50 : 0,
  }),
}));
