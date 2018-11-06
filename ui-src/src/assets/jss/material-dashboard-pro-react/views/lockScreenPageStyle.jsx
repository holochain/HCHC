// ##############################
// // // LockScreenPage view styles
// #############################

import {
  cardTitle,
  container
} from "../../material-dashboard-pro-react.jsx";

const lockScreenPageStyle = theme => ({
  cardTitle,
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  customCardClass: {
    width: "240px",
    margin: "60px auto 0",
    color: "#FFFFFF",
    display: "block",
    transform: "translate3d(0, 0, 0)",
    transition: "all 300ms linear"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardAvatar: {
    maxWidth: "90px",
    maxHeight: "90px",
    marginTop: "-45px"
  },
  customCardFooterClass: {
    border: "none",
    paddingTop: "0"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  }
});

export default lockScreenPageStyle;
