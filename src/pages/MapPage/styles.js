import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mapPage: ({ mapSize }) => ({
    position: "relative",
    overflow: "hidden",
    height: "calc(100% - 52px)",
    width: `${mapSize}%`,
    transition: theme.transitions.presets.expandCollapseWidth,
  }),
}));
