import * as React from 'react';
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// core components
import CardFooter from "../../../components/Card/CardFooter.jsx";
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

class CardFooterComponent extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <CardFooter chart>
          <div className={classes.stats}>
            {this.props.children}
          </div>
        </CardFooter>
      )
    }
  }

  CardFooterComponent.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardFooterComponent);
// export default withStyles(dashboardStyle)(CardFooterComponent);
