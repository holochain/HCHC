import * as React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
/*tslint:disable jsx-no-lambda*/

const title = {
  color: "#3C4858",
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: "#777",
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "3px",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const styles = () => ({
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px"
  },
});

class CardTitle extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <h4 className={classes.cardTitle}>
          {this.props.children}
        </h4>
      )
    }
  }

  CardTitle.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardTitle);
// export default withStyles(dashboardStyle)(CardTitle);
