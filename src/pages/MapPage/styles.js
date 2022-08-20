import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mapPage: ({ mapSize, breakPoint }) => ({
    position: "relative",
    overflow: "hidden",
    height: breakPoint === "lg" ? "100%" : "calc(100% - 52px)",
    width: `${mapSize}%`,
    transition: theme.transitions.presets.expandCollapseWidth,
  }),
}));
