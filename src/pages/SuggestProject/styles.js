import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: ({ renderFullMap }) => ({
    height: renderFullMap ? "100%" : "fit-content",
  }),
  card: ({ renderFullMap }) => ({
    margin: "auto",
    paddingTop: renderFullMap ? 20 : 10,
    width: renderFullMap ? "100%" : "70%",
    height: "100%",
    marginTop: renderFullMap ? 0 : 70,
  }),
  form: ({ renderFullMap }) => ({
    width: "100%",
    marginTop: renderFullMap ? 50 : 0,
  }),
}));
