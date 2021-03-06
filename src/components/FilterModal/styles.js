import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  card: {
    margin: "5% auto",
    width: "60%",
    height: 580,
  },
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
