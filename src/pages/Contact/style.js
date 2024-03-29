import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  paper: ({ renderFullMap, breakPoint }) => ({
    width: renderFullMap || breakPoint === "sm" ? "100%" : "80%",
    margin: breakPoint !== "sm" ? "50px auto 0 auto" : "auto",
    padding: "50px 20px",
    marginTop: 60,
  }),
  body: {
    width: "100%",
  },
  list: {
    padding: "10px 0 10px 25px",
  },
  div: {
    marginBottom: 60,
  },
  icons: {
    display: "flex",
    marginTop: 20,
    gap: 20,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  heading: {
    fontSize: 20,
  },
}));
