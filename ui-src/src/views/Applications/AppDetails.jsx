import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { VectorMap } from "react-jvectormap";
import ChartistGraph from "react-chartist";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import Timeline from "@material-ui/icons/Timeline";
import Widgets from "@material-ui/icons/Widgets";
import HelpOutline from "@material-ui/icons/HelpOutline";

// @material-ui/icons
import Checkbox from "@material-ui/core/Checkbox";
import Language from "@material-ui/icons/Language";

// core components
import CardIcon from "../../components/Card/CardIcon.jsx";
import Table from "../../components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import NavPills from "../../components/NavPills/NavPills.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";

import JdenticonPlaceHolder from '../../components/JdenticonFiller';
import { cardTitle } from "../../assets/jss/material-dashboard-pro-react.jsx";
import customSelectStyle from "../../assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const GITHUB_PROFILE = "#";

import us_flag from "../../assets/img/flags/US.png";
import de_flag from "../../assets/img/flags/DE.png";
import au_flag from "../../assets/img/flags/AU.png";
import gb_flag from "../../assets/img/flags/GB.png";
import ro_flag from "../../assets/img/flags/RO.png";
import br_flag from "../../assets/img/flags/BR.png";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  },
  appImage: {
    boxShadow : "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    borderRadius: "50%",
    maxHeight: "200px",
    maxWidth: "200px",
    margin: "13px auto 0"
  },
  appSnapshotCard : {
    border: "2px solid #313297",
    marginTop: "0px",
    paddingTop: "0px",
    minHeight:"400px",
  },
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choice: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};


class AppDetails extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    simpleSelect: "",
    edits: false,
    issues: false,
    downloads: false,
    network: false,
    active: props.active
  };
}

handleChange = panel => (event, expanded) => {
  this.setState({
    active: expanded ? panel : -1
  });
};

handleChangeIcon = name => event => {
  this.setState({ [name]: event.target.checked });
};

render() {
  const { classes, collapses } = this.props;
    return (
      <div>
        <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader>
                  <h4 className={classes.cardTitle}>
                    Application Name GOES HERE <small> - View your HApp health in Detail</small>
                  </h4>
                </CardHeader>
                <CardBody>
                  <NavPills
                    color="rose"
                    horizontal={{
                      tabsGrid: { xs: 12, sm: 12, md: 4 },
                      contentGrid: { xs: 12, sm: 12, md: 8 }
                    }}
                    tabs={[
                      {
                        tabButton: "Your App Store Snapshot",
                        tabIcon: Widgets,
                        tabContent: (
                          <span>
                            <Card profile className={classes.appSnapshotCard}>
                              <CardAvatar className={classes.appImage}>
                                <a href={GITHUB_PROFILE} onClick={e => e.preventDefault()}>
                                  <JdenticonPlaceHolder className="jdenticon" size={150} hash={ `asdfas876987ouiho87ui387ryfihasdlfh` } />
                                  {/* <img src={props.image} alt="app thumbnail image" /> */}
                                </a>
                              </CardAvatar>
                              <CardBody profile>
                                <h4 className={classes.cardCategory}>App Author (Your Name)</h4>
                                <br/>
                                <h3 className={classes.cardTitle}>App Title</h3>
                                <br/>
                                <br/>
                                <p className={classes.description}>
                                 App Rating
                                </p>
                                <p className={classes.description}>
                                 Application Description
                                </p>
                                <p className={classes.description}>
                                 Application Categories and Tags
                                </p>
                              </CardBody>
                            </Card>
                          </span>
                        )
                      },
                      {
                        tabButton: "App Stats",
                        tabIcon: Timeline,
                        tabContent: (
                          <span>
                            <Card profile className={classes.appSnapshotCard}>
                              <CardBody profile>
                                <GridItem xs={12} sm={12} md={12} lg={10}>
                                  <GridContainer>

                                    <GridItem xs={12} sm={4}>
                                      <div className={classes.choice}>
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={this.handleChangeIcon("edits")}
                                          checkedIcon={
                                            <i
                                              className={
                                                "fas fa-pencil-alt " + classes.iconCheckboxIcon
                                              }
                                            />
                                          }
                                          icon={
                                            <i
                                              className={
                                                "fas fa-pencil-alt " + classes.iconCheckboxIcon
                                              }
                                            />
                                          }
                                          classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox
                                          }}
                                        />
                                        <h6>Edits</h6>
                                      </div>
                                    </GridItem>

                                    <GridItem xs={12} sm={4}>
                                      <div className={classes.choice}>
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={this.handleChangeIcon("downloads")}
                                          checkedIcon={
                                            <i
                                              className={"fas fa-download " + classes.iconCheckboxIcon}
                                            />
                                          }
                                          icon={
                                            <i
                                              className={"fas fa-download " + classes.iconCheckboxIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox
                                          }}
                                        />
                                        <h6>Downloads</h6>
                                      </div>
                                    </GridItem>

                                    <GridItem xs={12} sm={4}>
                                      <div className={classes.choice}>
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={this.handleChangeIcon("issues")}
                                          checkedIcon={
                                            <i
                                              className={
                                                "fas fa-inbox " + classes.iconCheckboxIcon
                                              }
                                            />
                                          }
                                          icon={
                                            <i
                                              className={
                                                "fas fa-inbox " + classes.iconCheckboxIcon
                                              }
                                            />
                                          }
                                          classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox
                                          }}
                                        />
                                        <h6>Open Issues</h6>
                                      </div>
                                    </GridItem>

                                    <GridItem xs={12} sm={{size:4, offset:4}}>
                                      <div className={classes.choice}>
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={this.handleChangeIcon("network")}
                                          checkedIcon={
                                            <i
                                              className={"fas fa-sitemap " + classes.iconCheckboxIcon}
                                            />
                                          }
                                          icon = {
                                            <i
                                              className={"fas fa-sitemap " + classes.iconCheckboxIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox
                                          }}
                                        />
                                        <h6>Network Uptime</h6>
                                      </div>
                                    </GridItem>

                                  </GridContainer>
                                </GridItem>
                              </CardBody>
                            </Card>
                          </span>
                        )
                      },
                      {
                        tabButton: "Reviews",
                        tabIcon: QuestionAnswer,
                        tabContent: (
                          <span>
                            <Card profile className={classes.appSnapshotCard}>
                              <CardBody profile>
                                {/* TODO:  IF THE Review Length > 2, USE PAGINATION.... */}
                                <span><h3>Name of Author</h3></span>
                                <p>
                                  Sit on human your pillow is now my pet bed. Pounce on unsuspecting person eat prawns daintily with a claw then lick
                                  paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the
                                  fabric before taking a catnap claw drapes knock dish off table head butt cant eat out of my own dish or kitty
                                  poochy climb a tree, wait for a fireman jump to fireman then scratch his face lick butt. Caticus cuteicus
                                  pet my belly, you know you want to; seize the hand and shred it!
                                </p>
                                <hr/>
                                <span><h3>Name of Author</h3></span>
                                <p>
                                  Meow and walk away, and carefully drink from water glass and then spill it everywhere and proceed to lick the puddle.
                                  Cats secretly make all the worlds muffins scratch and instead of drinking water from the cat bowl.
                                  Cats go for world domination lounge in doorway yet chill on the couch table, yet love to play with owner's hair tie
                                  for eat plants, meow, and throw up because i ate plants, destroy couch as revenge. You are a captive audience.
                                </p>
                              </CardBody>
                            </Card>
                          </span>
                        )
                      }
                    ]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>


   {/* // This section should ONLY display when the correct link is clicked... */}
          <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader color="success" icon>
                  <CardIcon color="success">
                    <Language />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Downloads across globe
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="space-between">
                    <GridItem xs={12} sm={12} md={5}>
                      <Table
                        tableData={[
                          [
                            <img src={us_flag} alt="us_flag" />,
                            "USA",
                            "2.920",
                            "53.23%"
                          ],
                          [
                            <img src={de_flag} alt="us_flag" />,
                            "Germany",
                            "1.300",
                            "20.43%"
                          ],
                          [
                            <img src={au_flag} alt="us_flag" />,
                            "Australia",
                            "760",
                            "10.35%"
                          ],
                          [
                            <img src={gb_flag} alt="us_flag" />,
                            "United Kingdom",
                            "690",
                            "7.87%"
                          ],
                          [
                            <img src={ro_flag} alt="us_flag" />,
                            "Romania",
                            "600",
                            "5.94%"
                          ],
                          [
                            <img src={br_flag} alt="us_flag" />,
                            "Brasil",
                            "550",
                            "4.34%"
                          ]
                        ]}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent"
                        zoomOnScroll={false}
                        containerStyle={{
                          width: "100%",
                          height: "280px"
                        }}
                        containerClassName="map"
                        regionStyle={{
                          initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "none",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                          }
                        }}
                        series={{
                          regions: [
                            {
                              values: mapData,
                              scale: ["#AAAAAA", "#444444"],
                              normalizeFunction: "polynomial"
                            }
                          ]
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )
    }
  }

export default withStyles(styles)(AppDetails);
