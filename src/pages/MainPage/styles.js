import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mainPage: ({ mainPageSize, width }) => ({
    backgroundColor: theme.palette.gray.light,
    width: `${mainPageSize || 100}%`,
    height: width > 750 ? "calc(100vh - 72px)" : "calc(100vh - 129px)",
    transition: theme.transitions.presets.expandCollapseWidth,
    borderRight: `0.5px ${theme.palette.gray.regular} solid`,
    overflowY: "scroll",
    overflowX: "hidden",
    position: "relative",
    paddingTop: 10,
  }),
}));
