import * as React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Icon from "@material-ui/core/Icon";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
});


class EditIcon extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <Edit className={classes.underChartIcons} />
      )
    }
  }

  EditIcon.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(EditIcon);
// export default withStyles(dashboardStyle)(EditIcon);
