import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  buttonContainer: ({ delayedEffect, width, breakPoint }) => ({
    position: "absolute",
    zIndex: 10,
    right: delayedEffect && width > 1155 ? 120 : breakPoint === "sm" ? 20 : 70,
    top: 20,
  }),
}));
