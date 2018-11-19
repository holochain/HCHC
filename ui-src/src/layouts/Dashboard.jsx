import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// creates a pretty scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components and styles
import withStyles from "@material-ui/core/styles/withStyles";
import appStyle from "../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

// core components
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

// constants
import LOGO from "../assets/img/holochain-logo-lg.png";
import HCNIGHT from "../assets/img/hc-galaxy.jpg";

// routes
import dashboardRoutes from "../routes/dashboard.jsx";
/* tslint:disable:no-shadowed-variable */

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      }
      if (prop.collapse) {
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      }
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);


let smoothScroll;
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      smoothScroll = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      smoothScroll.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

 isNotMapRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }

  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"HC Dev Console"}
          logo={LOGO}
          image={HCNIGHT}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />

        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />

          {/* On the /maps/full-screen-maps route we want the map to be on full screen
              -this is not possible if the content and conatiner classes are present because
              they have some paddings which would make the map smaller */}
          {this.isNotMapRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}

          {this.isNotMapRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Dashboard);
