import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: {
    height: "fit-content",
    margin: "auto",
  },
  image: {
    height: 230,
    marginBottom: 8,
  },
  cardContent: {
    height: 80,
    marginBottom: 10,
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
  }),
  mapLink: {
    color: theme.palette.primary.light,
    padding: 5,
  },
}));
