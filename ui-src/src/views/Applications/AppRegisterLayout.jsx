import React from "react";

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
      checkedA: true,
      checkedB: false,
      simpleSelect: "",
      multipleSelect: [],
      tags: ["games", "learning", "ai"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  componentDidMount() {
    nouislider.create(this.refs.slider1, {
      start: [40],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 100 }
    });
    nouislider.create(this.refs.slider2, {
      start: [20, 60],
      connect: [false, true, false],
      step: 1,
      range: { min: 0, max: 100 }
    });
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
              <h4 className={classes.cardIconTitle}>Upload App Thumbnail</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <legend>Regular Image</legend>
                  <ImageUpload
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
                <GridItem xs={12} sm={4} md={3}>
                  <legend>Avatar</legend>
                  <ImageUpload
                    avatar
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
                <h4 className={classes.cardTitle}>Form Elements</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email adress"
                    id="email_adress"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password"
                    }}
                  />
                </GridItem>
                <div className={classes.checkboxAndRadio}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => this.handleToggle(2)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Subscribe to newsletter"
                  />
                </div>
                <Button color="rose">Submit</Button>
                <br/>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      With Help
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="help-text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      helpText="A block of help text that breaks onto a new line."
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Placeholder
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="placeholder"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "placeholder"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Disabled
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Disabled",
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Static control
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div className={classes.staticFormGroup}>
                      <p className={classes.staticFormControl}>
                        hello@creative-tim.com
                      </p>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Checkboxes and radios
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(3)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="First Checkbox"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(4)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Second Checkbox"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.selectedValue === "a"}
                            onChange={this.handleChange}
                            value="a"
                            name="radio button demo"
                            aria-label="A"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="First Radio"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.selectedValue === "b"}
                            onChange={this.handleChange}
                            value="b"
                            name="radio button demo"
                            aria-label="B"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Second Radio"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Inline checkboxes
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div className={classes.inlineChecks}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(10)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="a"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(11)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="b"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(12)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="c"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    );
  }
}

export default withStyles(regularFormsStyle)(AppRegisterLayout);
