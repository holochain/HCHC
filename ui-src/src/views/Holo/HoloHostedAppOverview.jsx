import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
// local view components
import AppData from "../Dashboard/AppDataArray";
import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class HoloHostedApps extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
      <h1 style={{color:"white", margin:"50px 0px", textAlign:"center"}}>Your hApps on Holo</h1>
        <GridContainer>
          <AppData />
        </GridContainer>
      </div>
    );
  }
}

HoloHostedApps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(HoloHostedApps);
