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
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      timelapse: null,
    };
    this.handleImageUpload();
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  b64toBlob = (b64Data, contentType, sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  makeBlob = (imageData) => {
    // console.log("this.props.thumbnail.imageData >> ", imageData);
    const splitData = imageData.split(",");
    const contentType=splitData[0].split(";")[0]
    const base64Data = splitData[1]
    console.log("this.props.thumbnail.base64Data >> ", base64Data);
    console.log("contentType: ",contentType);
    // const contentType = 'image/png';

    const blob = this.b64toBlob(imageData, contentType);
    const blobUrl = URL.createObjectURL(blob);

    console.log("blobUrl src", blobUrl);
    this.setState({blobUrl})
  }

  handleImageUpload = () => {
    const imageData = (this.props.thumbnail).split(":")[2];
    this.makeBlob(imageData);
  }

  render() {
    const defaultImg = <JdenticonPlaceHolder className="jdenticon" size={150} hash={this.props.hash} />;
    const { classes } = this.props;
    return (
      <GridItem xs={12} sm={6} md={4}>
        <Card chart className={classes.cardHover}>
          <CardHeader color="warning" className={classes.cardHeaderHover}>
          {this.state.image ?
            <img src={this.props.thumbanil} alt="App Thumbnail Image" />
            :
            defaultImg
          }
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
      </GridItem>
    );
  }
}

AppComponentLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AppComponentLayout);
