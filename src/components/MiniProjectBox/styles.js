import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  miniProjectBox: ({ bottom, width }) => ({
    position: "absolute",
    zIndex: 20,
    right: "4.5%",
    bottom,
    width: width > 490 ? 450 : 370,
    maxHeight: 600,
  }),
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
  description: {
    overflowY: "scroll",
    maxHeight: 350,
    scrollbarWidth: "none",
    msOverflowStyle: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  expandedIcon: ({ expanded }) => ({
    transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }),
  suggestionAction: {
    color: theme.palette.primary.light,
    cursor: "pointer",
  },
  suggestionDetails: {
    marginTop: -20,
  },
  suggestionData: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    width: "82%",
  },
  suggestionAddress: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",
  },
}));
