import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  card: {
    height: 410,
  },
  image: {
    height: "60%",
  },
  CardContent: {
    paddingLeft: 13,
    marginTop: 20,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 15,
    fontSize: "0.95rem",
  },
  infoContent: {
    display: "flex",
    alignItems: "center",
    gap: 3.5,
  },
}));
