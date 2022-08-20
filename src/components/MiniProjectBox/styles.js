import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  miniProjectBox: {
    position: "absolute",
    zIndex: 20,
    right: "4.5%",
    bottom: 25,
    width: 450,
    // height: 185,
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
  cardContent: {
    height: 10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: "0.95rem",
    marginTop: -13,
  },
  infoContent: {
    display: "flex",
    alignItems: "center",
    gap: 3.5,
  },
  expandedIcon: ({ expanded }) => ({
    transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }),
}));
