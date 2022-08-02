import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: ({ home, expanded }) => ({
    height: "fit-content",
    // paddingBottom: 20,
  }),
  image: ({ home }) => ({
    height: home ? "75%" : 230,
    marginBottom: 8,
  }),
  CardContent: {
    // textAlign: home && "center",
    // marginTop: ,
    height: 80,
    // paddingBottom: 20,
  },
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
}));
