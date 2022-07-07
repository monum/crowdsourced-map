import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  mapPage: ({ mapSize }) => ({
    position: "relative",
    overflow: "hidden",
    height: "100vh",
    width: `${mapSize}%`,
    transition: theme.transitions.presets.expandCollapseWidth,
  }),
  map: {
    height: "100%",
  },
}));
