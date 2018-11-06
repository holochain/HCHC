// ##############################
// // // IconCard styles
// #############################

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  cardTitle
} from "../../material-dashboard-pro-react.jsx";

const chartsStyle = {
  cardTitle,
  cardCategory: {
    margin: "0",
    color: "#999999"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  legendTitle: {
    color: grayColor,
    margin: "10px 0 !important",
    display: "flex"
  },
  primary: {
    color: primaryColor
  },
  warning: {
    color: warningColor
  },
  danger: {
    color: dangerColor
  },
  success: {
    color: successColor
  },
  info: {
    color: infoColor
  },
  rose: {
    color: roseColor
  },
  gray: {
    color: grayColor
  },
  cardFooter: {
    display: "block"
  }
};

export default chartsStyle;
