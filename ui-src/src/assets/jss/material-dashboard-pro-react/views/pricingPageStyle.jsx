// ##############################
// // // PricingPage Pages View styles
// #############################

import {
  container,
  defaultFont,
  cardTitle,
  roseColor
} from "../../material-dashboard-pro-react.jsx";

const pricingPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  title: {
    ...defaultFont,
    color: "#FFFFFF",
    marginTop: "5vh",
    marginBottom: "30px",
    textAlign: "center"
  },
  description: {
    fontSize: "18px",
    color: "#FFFFFF",
    textAlign: "center"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF !important"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  cardCategoryWhite: {
    color: "#FFFFFF",
    marginTop: "10px"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconWhite: {
    color: "#FFFFFF"
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  }
});

export default pricingPageStyle;
