import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Description from "@material-ui/icons/Description";
import AccessTime from "@material-ui/icons/AccessTime";
import Pageview from "@material-ui/icons/Pageview";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import JdenticonPlaceHolder from '../../components/JdenticonFiller';

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import "./style/dashboard.css"


class AppComponentLayout extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card chart className={classes.cardHover}>
        <CardHeader color="warning" className={classes.cardHeaderHover}>
          {/* // <JdenticonPlaceHolder className="jdenticon" size={150} hash={this.props.hash} /> */}
         <img src={this.props.thumbanil} alt="App Thumbnail Image" />
        </CardHeader>
        <CardBody>
          <div className={classes.cardHoverUnder}>
             <Link to={`/details/${this.props.Hash}`}>
              <Tooltip
                id="tooltip-top"
                title="View Details"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button simple color="info" justIcon>
                  <Pageview className={classes.underChartIcons} />
                </Button>
              </Tooltip>
            </Link>
            <Link to={`/update/${this.props.Hash}`}>
              <Tooltip
                id="tooltip-top"
                title="Update hApp"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Button color="transparent" simple justIcon>
                  <Edit className={classes.underChartIcons} />
                </Button>
              </Tooltip>
            </Link>
          </div>
          <h4 className={classes.cardTitle}>{this.props.title}</h4>
          <p className={classes.cardCategory}>
          <span className={classes.successText}>
            <Description className={classes.upArrowCardCategory} />
            {this.props.description}
          </span>
          </p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> Last Updated: 2 minutes ago
            {/* {this.props.lastUpdate} */}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

AppComponentLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AppComponentLayout);
