import * as React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  stats: {
    color: "#999999",
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-flex",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px"
    }
  },
});

class CardStats extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <div className={classes.stats}>
          {this.props.children}
        </div>
      )
    }
  }

  CardStats.propTypes = {
    classes: PropTypes.object.isRequired
  };


export default withStyles(styles)(CardStats);
// export default withStyles(dashboardStyle)(CardStats);
