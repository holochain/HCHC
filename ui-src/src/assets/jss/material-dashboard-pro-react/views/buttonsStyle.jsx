// ##############################
// // // Buttons view styles
// #############################

import buttonGroupStyle from "../buttonGroupStyle.jsx";

const buttonsStyle = {
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    fontSize: "18px"
  },
  cardHeader: {
    zIndex: "3"
  },
  cardContentLeft: {
    padding: "15px 20px 15px 0px",
    position: "relative"
  },
  cardContentRight: {
    padding: "15px 20px 15px 0px",
    position: "relative"
  },
  cardContentBottom: {
    padding: "15px 0px 0px 0px",
    position: "relative"
  },
  marginRight: {
    marginRight: "5px"
  },
  icons: {
    width: "17px",
    height: "17px"
  },
  ...buttonGroupStyle,
  socialButtonsIcons: {
    fontSize: "18px",
    marginTop: "-2px",
    position: "relative"
  }
};

export default buttonsStyle;
