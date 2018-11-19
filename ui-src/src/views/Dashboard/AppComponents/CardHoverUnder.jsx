import * as React from 'react';
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  cardHoverUnder: {
    position: "absolute",
    zIndex: "1",
    top: "-50px",
    width: "calc(100% - 30px)",
    left: "17px",
    right: "17px",
    textAlign: "center"
  }
});

class CardHoverUnder extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <div className={classes.cardHoverUnder}>
          {this.props.children}
        </div>
      )
    }
  }

  CardHoverUnder.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardHoverUnder);
// export default withStyles(dashboardStyle)(CardHoverUnder);
