import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  navContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  mapNav: {
    padding: "8.8px 0",
    display: "flex",
    width: "90%",
    margin: "auto",
    justifyContent: "space-between",
  },
}));
