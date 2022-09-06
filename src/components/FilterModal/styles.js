import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: ({ breakPoint, width }) => ({
    margin: "5% auto",
    height: 580,
    width: breakPoint === "sm" ? "100%" : width < 740 ? 590 : 720,
  }),
  cardHeader: {
    color: theme.palette.primary.main,
  },
  cardContent: {
    backgroundColor: `${theme.palette.gray.light}`,
    height: "77%",
    overflow: "scroll",
    borderTop: `1.5px solid ${theme.palette.gray.regular}`,
    borderBottom: `1.5px solid ${theme.palette.gray.regular}`,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    width: "98%",
    margin: "auto",
    justifyContent: "space-between",
  },
  section: {
    borderBottom: `0.5px solid ${theme.palette.gray.regular}`,
    padding: "20px 0",
    minHeight: "65%",
  },
  clearButton: {
    padding: 10,
  },
}));
