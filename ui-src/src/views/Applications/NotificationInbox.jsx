/*eslint-disable*/
import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";

// core components
import Heading from "../../components/Heading/Heading.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import Instruction from "../../components/Instruction/Instruction.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import notificationsStyle from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";

import noticeModal1 from "../../assets/img/card-1.jpeg";
import noticeModal2 from "../../assets/img/card-2.jpeg";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NotificationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      classicModal: false,
      noticeModal: false,
      smallModal: false
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    if (!this.state[place]) {
      var x = [];
      x[place] = true;
      this.setState(x);
      setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
      );
    }
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <div className={classes.cardHeader}>
                  <h4 className={classes.cardTitle}>Notifications Inbox:</h4>
                </div>
                <br />
                <SnackbarContent
                  message={
                    "A good message goes here.."
                  }
                  close
                  icon={AddAlert}
                  color="info"
                />
                <br />
                <SnackbarContent
                  message={
                    "A flagged/important/or attn needed message goes here..."
                  }
                  close
                  icon={AddAlert}
                  color="rose"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(notificationsStyle)(NotificationInbox);
