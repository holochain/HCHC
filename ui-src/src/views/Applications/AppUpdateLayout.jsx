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

// react component plugin for creating tags on an input
import TagsInput from "react-tagsinput";

// @material-ui/icons
import Description from "@material-ui/icons/Description";
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
import TextField from '@material-ui/core/TextField';
import CardHeader from "../../components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

// local components
import FileUpload from "./FileUpload.tsx"
import SubmitButton from "./SubmitButton.tsx"

import regularFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import extendedFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

class AppRegisterLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      selectedImage: null,
      selectedDNAFile: null,
      selectedUIFile: null,
      selectedTitle: "",
      selectedDescription: "",
      selectedDate: null,
      multipleSelect: [],
      holoEnabled: true,
      tags: ["games"]
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleHoloEnabledToggle = this.handleHoloEnabledToggle.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.updateErrorMessage = this.updateErrorMessage.bind(this);

    this.imageSelect = this.imageSelect.bind(this);
    this.uiFileSelect = this.uiFileSelect.bind(this);
    this.dnaFileSelect = this.dnaFileSelect.bind(this);
  }

  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };

  handleInput = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleHoloEnabledToggle = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleDate(date) {
    console.log("new date: ", date);
    const newDate = date._d;
    this.setState({ selectedDate: newDate });
  }

  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }

  updateErrorMessage(message) {
    console.log("update error message", message);
    this.setState({ errorMessage: message });
  }

  imageSelect(img) {
    this.setState({
      selectedImage: img,
    });
    console.log("THIS IS THE NEWLY SELECTED IMG: ", this.state.selectedImage);
  }

  dnaFileSelect(file) {
    this.setState({
      selectedDNAFile: file,
    });
    console.log("THIS IS THE NEWLY SELECTED DNA FILE: ", this.state.selectedDNAFile);
  }

  uiFileSelect(file) {
    this.setState({
      selectedUIFile: file,
    });
    console.log("THIS IS THE NEWLY SELECTED UI FILE ", this.state.selectedUIFile);
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Camera />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update App Thumbnail</h4>
            </CardHeader>
            <CardBody style={{margin:"0 auto"}}>
              <GridContainer>
                <GridItem xs={12} style={{margin:"0 auto", textAlign:"center"}}>
                  <legend>Image Preview</legend>
                  <ImageUpload
                    fullWidth
                    onImageUpdate={this.imageSelect}
                    addButtonProps={{
                      color: "primary",
                      round: true
                    }}
                    changeButtonProps={{
                      color: "primary",
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
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Description />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update App Source Code</h4>

              {/* TODO: MAKE THE FOLLOWING A TOOL-TIP */}
              <h5 className={classes.cardIconTitle}><em>NB: When uploading folders, please ensure they are zipped.</em></h5>
            </CardHeader>
            <CardBody>
              <GridContainer style={{width:"100%"}}>
                <GridItem xs={12} sm={4} md={6} style={{margin:"0 auto", textAlign:"center"}}>
                  <legend sytle={{textAlign:"center"}}>DNA File</legend>
                  <FileUpload
                    onFileUpdate={this.dnaFileSelect}
                    addButtonProps={{
                      color: "primary",
                      round: true
                    }}
                    changeButtonProps={{
                      color: "primary",
                      round: true
                    }}
                    removeButtonProps={{
                      color: "danger",
                      round: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} md={6} style={{margin:"0 auto", textAlign:"center"}}>
                  <legend>UI File</legend>
                  <FileUpload
                    onFileUpdate={this.uiFileSelect}
                    addButtonProps={{
                      color: "primary",
                      round: true
                    }}
                    changeButtonProps={{
                      color: "primary",
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

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" text>
              <CardText color="primary">
                <h4 className={classes.cardTitle}>App Details</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={6}>
                        <legend>Update your app title</legend>
                        <TextField
                          fullWidth
                          label="App Title"
                          id="app-title"
                          value={this.state.selectedTitle}
                          onChange= {this.handleInput("selectedTitle")}
                        />
                      </GridItem>

                      <br/>
                      <br/>
                      <GridItem xs={12} sm={6}>
                        <legend>Update your app categories</legend>
                          <GridItem xs={12}>
                            <FormControl
                              fullWidth
                              className={classes.selectFormControl}
                            >
                              <InputLabel
                                htmlFor="category"
                                className={classes.selectLabel}
                              >
                                Choose Category
                              </InputLabel>

                              <Select
                                multiple
                                value={this.state.multipleSelect}
                                onChange={this.handleMultiple}
                                MenuProps={{ className: classes.selectMenu }}
                                classes={{ select: classes.select }}
                                inputProps={{
                                  name: "category",
                                  id: "category"
                                }}
                              >
                                <MenuItem
                                  disabled
                                  classes={{
                                    root: classes.selectMenuItem
                                  }}
                                >
                                  Choose Category
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Games"
                                >
                                  Games
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Administrator Tools"
                                >
                                  Administrator Tools
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Developer Tools"
                                >
                                  Developer Tools
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Top Downloads"
                                >
                                  Top Downloads
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Categories"
                                >
                                  Categories
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Movies"
                                >
                                  Movies
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Educational"
                                >
                                  Educational
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Finance"
                                >
                                  Finance
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Leisure"
                                >
                                  Leisure
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelectedMultiple
                                  }}
                                  value="Music"
                                >
                                  Music
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </GridItem>
                      </GridItem>
                    </GridContainer>

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <GridContainer>
                      <GridItem xs={12} sm={12}>
                        <legend>Update your app description</legend>
                        <TextField
                          fullWidth
                          label="Description"
                          id="description"
                          value={this.state.selectedDescription}
                          onChange={this.handleInput("selectedDescription")}
                          multiline
                          rows="5"
                        />
                      </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <br />
                  <br />
                  <GridContainer style={{margin:"0 auto"}}>
                    <GridItem xs={12} sm={6}>
                      <legend>Update your app tags</legend>
                      <TagsInput
                        value={this.state.tags}
                        onChange={this.handleTags}
                        tagProps={{ className: "react-tagsinput-tag info" }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={6}>
                      <legend>Update Holo Hosting Selection</legend>
                      <div className={classes.block}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.holoEnabled}
                              onChange={this.handleHoloEnabledToggle("holoEnabled")}
                              value="holoEnabled"
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
                    <GridItem xs={12}>
                      <Card>
                        <CardHeader color="primary" icon>
                          <CardIcon color="primary">
                            <Today />
                          </CardIcon>
                          <h4 className={classes.cardIconTitle}>Publish your App's Birthday</h4>
                        </CardHeader>
                        <CardBody>
                          <InputLabel className={classes.label}>
                            Locate the Appication's Creation Date.
                          </InputLabel>
                          <br />
                          <FormControl fullWidth>
                            <Datetime
                              onChange={this.handleDate}
                              utc={true}
                              inputProps={{ placeholder: "Enter Date and Time Here" }}
                            />
                          </FormControl>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>

              <SubmitButton
                toggleErrorMessage={this.updateErrorMessage}
                states={this.state}
                submitButtonProps={{
                  color: "primary",
                  round: true
               }}/>
              <br/>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}}

export default withStyles(regularFormsStyle)(AppRegisterLayout);
