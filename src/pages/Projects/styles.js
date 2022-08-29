import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  main: ({ breakPoint }) => ({
    margin: "auto",
    marginLeft: breakPoint === "lg" && 40,
    marginTop: breakPoint !== "lg" && 30,
    overflowY: "scroll",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  }),
  header: ({ mapSize }) => ({
    display: "flex",
    width: "100%",
    minWidth: 750,
    paddingRight: 30,
    justifyContent: "space-between",
    alignItems: "end",
    color: theme.palette.primary.light,
    borderBottom: `3px solid ${theme.palette.primary.light}`,
    paddingBottom: 10,
    fontSize: mapSize === 100 && 15,
  }),

  projectsContainer: ({ breakPoint }) => ({
    width: breakPoint !== "lg" && "93%",
    padding: breakPoint === "sm" && "0 5.5%",
    margin: breakPoint !== "lg" && "auto",
    marginRight: breakPoint === "sm" ? 0 : "",
    minHeight: "fit-content",
  }),
}));
