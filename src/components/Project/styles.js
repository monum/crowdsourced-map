import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  card: ({ home }) => ({
    height: home ? 300 : 400,
  }),
  image: ({ home }) => ({
    height: home ? "75%" : "61%",
  }),
  CardContent: ({ home }) => ({
    // textAlign: home && "center",
    paddingLeft: 13,
    marginTop: 20,
  }),
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
