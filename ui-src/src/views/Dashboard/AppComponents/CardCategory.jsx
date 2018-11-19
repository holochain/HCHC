import * as React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  cardCategory: {
    color: "#999999",
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
});


class CardCategory extends React.Component  {
    render() {
        const { classes } = this.props;
        return (
          <p className={classes.cardCategory}>
            {this.props.children}
          </p>
        )
    }
  }

  CardCategory.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardCategory);
// export default withStyles(dashboardStyle)(CardCategory);
