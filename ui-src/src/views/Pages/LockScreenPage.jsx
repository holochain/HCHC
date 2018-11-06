import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Button from "../../components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import avatar from "../../assets/img/faces/avatar.jpg";

import lockScreenPageStyle from "../../assets/jss/material-dashboard-pro-react/views/lockScreenPageStyle.jsx";

class LockScreenPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form>
          <Card
            profile
            className={
              classes.customCardClass + " " + classes[this.state.cardAnimaton]
            }
          >
            <CardAvatar profile className={classes.cardAvatar}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Tania Andrew</h4>
              <CustomInput
                labelText="Enter Password"
                id="company-disabled"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "password"
                }}
              />
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" round>
                Unlock
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    );
  }
}

LockScreenPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(lockScreenPageStyle)(LockScreenPage);
