import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mapPage: ({ mapSize }) => ({
    position: "relative",
    overflow: "hidden",
    height: "100%",
    width: `${mapSize}%`,
    transition: theme.transitions.presets.expandCollapseWidth,
  }),
}));
