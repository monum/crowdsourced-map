import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: ({ expanded }) => ({
    height: "fit-content",
    margin: "auto",
    // width: "100%",
    // paddingBottom: 20,
  }),
  image: {
    height: 230,
    marginBottom: 8,
  },
  cardContent: {
    // textAlign: home && "center",
    // marginTop: ,
    height: 80,
    marginBottom: 10,
    // paddingBottom: 20,
  },
  // desctiption: ({ width }) => ({
  //   marginTop: width > 955 ? 0 : 30,
  // }),
  title: {
    paddingLeft: 8,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
    fontSize: "0.95rem",
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
  mapLink: {
    color: theme.palette.primary.light,
    padding: 5,
  },
}));
