import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  card: ({ renderFullMap, breakPoint }) => ({
    margin: "auto",
    overflowY: "scroll",
    paddingTop: renderFullMap ? 20 : 10,
    width: renderFullMap || breakPoint !== "lg" ? "100%" : "70%",
    maxHeight: "95%",
    marginBottom: 20,

    marginTop: 70,
  }),
  form: ({ renderFullMap }) => ({
    width: "100%",
    marginTop: renderFullMap ? 50 : 0,
  }),
}));
