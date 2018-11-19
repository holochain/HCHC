import React from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// plugin that creates slider
import nouislider from "nouislider";
// react component plugin for creating tags on an input
import TagsInput from "react-tagsinput";

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Today from "@material-ui/icons/Today";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import ImageUpload from "../../components/CustomUpload/ImageUpload.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import regularFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import extendedFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

class AppRegisterLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b",
      HoloOn: true,
      checkedB: false,
      simpleSelect: "",
      multipleSelect: [],
      tags: ["games", "learning", "ai"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  // componentDidMount() {
  //   nouislider.create(this.refs.slider1, {
  //     start: [40],
  //     connect: [true, false],
  //     step: 1,
  //     range: { min: 0, max: 100 }
  //   });
  //   nouislider.create(this.refs.slider2, {
  //     start: [20, 60],
  //     connect: [false, true, false],
  //     step: 1,
  //     range: { min: 0, max: 100 }
  //   });
  // }

  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }

  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }


  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Camera />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update App Thumbnail</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <legend>Image Preview</legend>
                  <ImageUpload
                    style={{justifyContent:"center"}}
                    addButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    changeButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    removeButtonProps={{
                      color: "danger",
                      round: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Camera />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update App Source Code</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={4} md={6}>
                  <legend>DNA Upload</legend>
                  file upload here
                </GridItem>
                <GridItem xs={12} sm={4} md={6}>
                  <legend>UI Upload</legend>
                  file upload here
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>App Snapshot</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="App Title"
                      id="app-title"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Category"
                      id="Category"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                <GridItem xs={12}>
                  <CustomInput
                    labelText="description"
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text-area"
                    }}
                  />
                </GridItem>
                </GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardBody>
                      <br />
                      <br />
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <legend>App Tags</legend>
                          <TagsInput
                            value={this.state.tags}
                            onChange={this.handleTags}
                            tagProps={{ className: "react-tagsinput-tag info" }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={6}>
                          <legend>Enable Holo Hosting</legend>
                          <div className={classes.block}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={this.state.HoloOn}
                                  onChange={this.handleChange("HoloOn")}
                                  value="HoloOn"
                                  classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    icon: classes.switchIcon,
                                    iconChecked: classes.switchIconChecked,
                                    bar: classes.switchBar
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label
                              }}
                              label="Turn on to enroll app in Holo Hosting"
                            />
                          </div>
                        </GridItem>
                      </GridContainer>
                      <br />
                      <br />

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardHeader color="rose" icon>
                              <CardIcon color="rose">
                                <Today />
                              </CardIcon>
                              <h4 className={classes.cardIconTitle}>App Creation Date</h4>
                            </CardHeader>
                            <CardBody>
                              <InputLabel className={classes.label}>
                                Publish the birthdate of this app.
                              </InputLabel>
                              <br />
                              <FormControl fullWidth>
                                <Datetime
                                  inputProps={{ placeholder: "Enter Date and Time Here" }}
                                />
                              </FormControl>
                            </CardBody>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>

                <Button color="rose">Submit</Button>
                <br/>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(AppRegisterLayout);
