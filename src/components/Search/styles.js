import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  searchContainer: {
    width: "85%",
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 10,
    top: 15,
  },
  searchBar: {
    width: "80%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "2px 3px 2px 2px rgba(0, 0, 0, 0.2)",
  },
}));
