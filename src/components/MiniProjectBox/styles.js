import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  miniProjectBox: {
    position: "absolute",
    zIndex: 20,
    left: "50%",
    bottom: 25,
    transform: "translateX(-50%)",
    width: "87vw",
  },
  puller: {
    width: 30,
    height: 6,
    backgroundColor: "grey",
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  },
}));
