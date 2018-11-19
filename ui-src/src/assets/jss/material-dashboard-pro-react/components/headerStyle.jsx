// ##############################
// // // Header styles
// #############################

import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "../../material-dashboard-pro-react.jsx";

const headerStyle = theme => ({
  appBar: {
    backgroundColor: "#081455",
    boxShadow: "0 12px 20px -10px #25258a, 0 4px 20px 0 #202129, 0 7px 8px -5px #e4e4e4",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: "#ffffff",
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block"
  },
  container: {
    ...containerFluid,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    margin: "0 !important",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    ...defaultBoxShadow
  },
  sidebarMinimize: {
    float: "left",
    padding: "0 0 0 15px",
    display: "block",
    color: "#555555",
    background: "#00610"
  },
  sidebarMinimizeRTL: {
    padding: "0 15px 0 0 !important"
  },
  sidebarMiniIcon: {
    width: "20px",
    height: "17px"
  }
});

export default headerStyle;
