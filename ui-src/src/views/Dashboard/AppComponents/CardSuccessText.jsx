import * as React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
/*tslint:disable jsx-no-lambda*/

const successColor = "#1e7270";

const styles = () => ({
  successText: {
    color: successColor
  },
});

class CardSuccessText extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <span className={classes.successText}>
          {this.props.children}
        </span>
      )
    }
  }

  CardSuccessText.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardSuccessText);
// export default withStyles(dashboardStyle)(CardSuccessText);
