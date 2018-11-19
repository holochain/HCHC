import * as React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// @material-ui/icons
import Description from "@material-ui/icons/Description";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
});

class CardDescription extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <Description className={classes.upArrowCardCategory} />
      )
    }
  }

  CardDescription.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardDescription);
// export default withStyles(dashboardStyle)(CardDescription);
