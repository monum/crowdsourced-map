import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mainPage: ({ mainPageSize, status, breakPoint }) => ({
    backgroundColor: theme.palette.gray.light,
    width: `${mainPageSize || 100}%`,
    height: breakPoint === "lg" ? "calc(100vh - 72px)" : "calc(100vh - 127px)",
    transition: theme.transitions.presets.expandCollapseWidth,
    borderRight: `0.5px ${theme.palette.gray.regular} solid`,
    overflowY: status.isLoading || status.error ? "hidden" : "scroll",
    overflowX: "hidden",
    position: "relative",
    paddingTop: 10,
  }),
}));
