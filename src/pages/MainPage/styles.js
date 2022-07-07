import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mainPage: ({ mainPageSize }) => ({
    backgroundColor: theme.palette.gray.light,
    width: `${mainPageSize}%`,
    height: "100vh",
    transition: theme.transitions.presets.expandCollapseWidth,
    borderRight: `0.5px ${theme.palette.gray.regular} solid`,
    overflowY: "scroll",
    overflowX: "visible",
    position: "relative",
  }),
  mainPageContent: {
    marginTop: 100,
  },
}));
