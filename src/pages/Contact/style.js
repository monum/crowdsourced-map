import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  paper: ({ renderFullMap, breakPoint }) => ({
    width: renderFullMap || breakPoint === "sm" ? "100%" : "80%",
    margin: breakPoint !== "sm" ? "50px auto 0 auto" : "auto",
    padding: 20,
    marginBottom: renderFullMap || breakPoint !== "sm" ? 100 : 0,
  }),
  body: {
    width: "100%",
  },
  list: {
    padding: "10px 0 10px 25px",
  },
  div: {
    marginBottom: 30,
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
  },
  heading: {
    fontSize: 20,
  },
  link: {
    color: `${theme.palette.primary.light}`,
    cursor: "pointer",
    textDecoration: "none",
  },
}));
