import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import footerStyle from "../../assets/jss/material-dashboard-pro-react/components/footerStyle";
// constants
const WEBSITE = "https://holochain.org"
const GITBOOK = "https://developer.holochain.org/"
const DEVDOCS = "https://holochain.github.io/holochain-rust/"


function Footer({ ...props }) {
  const { classes, fluid, white } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href={WEBSITE} className={block}>
              Holochain
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={GITBOOK} className={block}>
              HC-Manuel
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href={DEVDOCS} className={block}>
              Dev-Docs
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          Holochain &copy; {1900 + new Date().getYear()}{" "}
          <a href={WEBSITE} target="_blank" className={anchor}></a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
