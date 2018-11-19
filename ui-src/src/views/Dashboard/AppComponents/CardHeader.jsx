import * as React from 'react';
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// core components
import CardHeader from "../../../components/Card/CardHeader.jsx";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  cardHeaderHover: {
    transition: "all 300ms cubic-bezier(0.34, 1.61, 0.7, 1)"
  },
});


class CardHeaderComponent extends React.Component  {
    render() {
        const { classes } = this.props;
        return (
          <CardHeader color="info" className={classes.cardHeaderHover}>
            {this.props.children}
          </CardHeader>
        )
    }
  }

  CardHeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(CardHeaderComponent);
// export default withStyles(dashboardStyle)(CardHeaderComponent);
