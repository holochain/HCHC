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
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
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
      selectedValue: null,
      selectedImage: null,
      selectedDNAFile: null,
      selectedUIFile: null,
      selectedEnabled: "",
      HoloOn: true,
      multipleSelect: [],
      tags: ["example"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

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

  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleTags(regularTags) {
    this.setState({ tags: regularTags });
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
    console.log("THIS IS THE NEWLY SELECTED IMG: ", this.state.selectedImage);
  }

  uiFileSelect(file) {
    this.setState({
      selectedUIFile: file,
    });
    console.log("THIS IS THE NEWLY SELECTED IMG: ", this.state.selectedImage);
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
              <h4 className={classes.cardIconTitle}>Upload App Thumbnail</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <legend>Image Preview</legend>
                  <ImageUpload
                    onImageUpdate={this.imageSelect}
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
                <Description />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Upload App Source Code</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={4} md={6}>
                  <legend>DNA Upload</legend>
                  DNA file upload here
                  <FileUpload
                    onImageUpdate={this.dnaFileSelect}
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
                <GridItem xs={12} sm={4} md={6}>
                  <legend>UI Upload</legend>
                  UI file upload here
                  <FileUpload
                    onImageUpdate={this.uiFileSelect}
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

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>App Snapshot</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <legend>Title your app.</legend>
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
                      <br/>
                      <br/>
                      <GridItem xs={12} sm={12} md={6}>
                        <legend>Select categories that represent your app.</legend>
                          <GridItem xs={12} sm={6} md={5} lg={5}>
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
                    <GridItem xs={12}>
                      <legend>Write a brief description about your app.</legend>
                      <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>

                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardBody>
                      <br />
                      <br />
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <legend>Create Tags Themes that Identify your App</legend>
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
                              <h4 className={classes.cardIconTitle}>Publish your App's Birthday</h4>
                            </CardHeader>
                            <CardBody>
                              <InputLabel className={classes.label}>
                                Locate the Appication's Creation Date.
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

////// Work on this...
                <SubmitButton
                  states={this.state}
                  submitButtonProps={{
                    color: "rose",
                    round: true
                 }}/>
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
