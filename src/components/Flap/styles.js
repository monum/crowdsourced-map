import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  flap: {
    position: "absolute",
    top: "50%",
    left: -12,
    transform: "rotate(90deg)",
    zIndex: 2,
  },
  button: {
    padding: "20px 0",
  },
}));
