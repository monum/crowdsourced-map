import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  paper: ({ renderFullMap, breakPoint }) => ({
    width: renderFullMap || breakPoint === "sm" ? "100%" : "80%",
    margin: "50px auto 0 auto",
    padding: 20,
    marginBottom: renderFullMap || breakPoint === "sm" ? 100 : 0,
  }),
  list: {
    padding: "10px 0 10px 25px",
  },
  link: {
    color: `${theme.palette.primary.light}`,
    cursor: "pointer",
    textDecoration: "none",
  },
}));
