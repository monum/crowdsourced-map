import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createTheme, duration, easing, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0C2639",
      light: "#288BE4",
      dark: "#091F2F",
    },
    secondary: {
      main: "#FB4D42",
    },
    gray: {
      light: "#F2F2F2",
      medium: "#E0E0E0",
      regular: "rgba(0, 0, 0, 0.204)",
      dark: "#58585B",
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 400,
    fontWeightMedium: 500,
    fontWeightRegular: 600,
    fontWeightBold: 700,
  },
  transitions: {
    duration: {
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 1000,
      // long: 800,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },

    presets: {
      expandCollapseWidth: `width ${duration.standard}ms ${easing.easeInOut}`,
      color: `color ${duration.standard}ms ${easing.easeInOut}`,
    },
  },
});

ReactDom.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
