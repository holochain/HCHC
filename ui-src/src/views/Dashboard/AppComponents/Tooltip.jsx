import * as React from 'react';
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// core components
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
    root: {
      display: 'flex',
    },
    tooltip : {
      padding: "10px 15px",
      minWidth: "130px",
      color: "#FFFFFF",
      lineHeight: "1.7em",
      background: "rgba(85,85,85,0.9)",
      border: "none",
      borderRadius: "3px",
      opacity: "1!important",
      boxShadow: "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
      maxWidth: "200px",
      textAlign: "center",
      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      textShadow: "none",
      textTransform: "none",
      letterSpacing: "normal",
      wordBreak: "normal",
      wordSpacing: "normal",
      wordWrap: "normal",
      whiteSpace: "normal",
      lineBreak: "auto"
    },
});


class ToolTipComponent extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <Tooltip
          id="tooltip-top"
          title="View Details"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          {this.props.children}
        </Tooltip>
      )
    }
  }

  ToolTipComponent.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(ToolTipComponent);
  // export default withStyles(dashboardStyle)(ToolTipComponent);
