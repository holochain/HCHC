import * as React from 'react';
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// core components
import Card from "../../../components/Card/Card.jsx";
/*tslint:disable jsx-no-lambda*/

const styles = () => ({
  cardHover: {
    "&:hover": {
      "& $cardHeaderHover": {
        transform: "translate3d(0, -50px, 0)"
      }
    }
  },
  cardHeaderHover: {
    transition: "all 300ms cubic-bezier(0.34, 1.61, 0.7, 1)"
  },
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

class CardItem extends React.Component  {
  render() {
      const { classes } = this.props;
      return (
        <Card chart className={classes.cardHover}>
          {this.props.children}
        </Card>
      )
    }
  }

  CardItem.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(CardItem);
// export default withStyles(dashboardStyle)(CardItem);
