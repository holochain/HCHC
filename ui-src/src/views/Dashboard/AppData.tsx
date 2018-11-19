import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import { fetchPOST } from '../../utils';
import { Hash } from '../../../../holochain';
import { ProfileState, AppDetailState } from '../../../../types'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

// import local view components
import CardCategory from "./AppComponents/CardCategory";
import CardDescription from "./AppComponents/CardDescription";
import CardFooter from "./AppComponents/CardFooter";
import CardHeader from "./AppComponents/CardHeader";
import CardHoverUnder from "./AppComponents/CardHoverUnder";
import CardItem from "./AppComponents/CardItem";
import CardStats from "./AppComponents/CardStats";
import CardSuccessText from "./AppComponents/CardSuccessText";
import CardTitle from "./AppComponents/CardTitle";
import EditIcon from "./AppComponents/EditIcon";
import PageViewIcon from "./AppComponents/PageViewIcon";
import Tooltip from "./AppComponents/Tooltip";
import JdenticonPlaceHolder from './AppComponents/JdenticonFiller';


// additional custom styling
import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
// import '../style/ContainerPage.css';
/*tslint:disable jsx-no-lambda*/

type AppComponentProps = {
  currentAgent: { agent: { Hash: Hash, Name: string } },
  currentProfile: ProfileState | null,
  AllMyApps: [{Entry:AppDetailState, Hash: Hash}] | null,
  appsByCategory: [{Hash: Hash, category: string}],
  currentCategory: string,
  currentAppHash: string,
  submitted: boolean,
  fetchAgent: () => void,
  fetchProfile: () => void,
  fetchAllApps: () => void,
  registerCurrentAppHash: (appHash) => void,
  getappsByCategory: (cateogry) => void,
  fetchAppDetails: (appHash) => void,
  getCurrentAppCategories: () => void,
}

class AppData extends React.Component<AppComponentProps, {}>  {
  constructor(props: any) {
    super(props);
    this.state = {
      submitted: false,
    }
  }

  public componentDidMount() {
    this.props.fetchAgent();
    this.props.fetchProfile();
    this.props.fetchAllApps();
    // setInterval(this.props.fetchAllApps(), 500);
  }

    public redirect = () => {
      this.setState({submitted: true})
    }

    public handleSelectApp = (eventCurrentTarget: any) => {
      const appHash = eventCurrentTarget!.value;
      console.log("appHash >> as calculated from the eventCurrentTarget handle")
      // this.props.fetchAppDetails(appHash);
    }

    public render() {
      if (!this.props.currentAgent || !this.props.AllMyApps) {
        return <div>
          <h4 className="loading-text">Loading...</h4>
        </div>
      }
      const { agent } = this.props.currentAgent;
      const { currentCategory, AllMyApps} = this.props;
      console.log("AllMyApps", AllMyApps);
      console.log("currentCategory", currentCategory);

      const renderApps = AllMyApps.map(app => {
        console.log("this.props.AllApps app.Entry", app.Entry);
        const justIcon :boolean = true;
        const simple :boolean = true;
        return (
          <GridItem  className="appstore-app-icons" xs={12} sm={12} md={4} onClick={e => this.handleSelectApp(e!.currentTarget)} key={app.Hash}>
            <CardItem>
              <CardHeader>
                {/*  <img src={app.Entry!.thumbnail} /> */}
                 <JdenticonPlaceHolder className="jdenticon" size={150} hash={ app.Hash } />
              </CardHeader>

              <CardBody>
                <CardHoverUnder>
                  <Tooltip>
                    <Link to={`/happ/happdetails/${app.Hash}`}>
                      <Button simple={simple} color="info" justIcon={justIcon} >
                        <PageViewIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip>
                    <Link to={`/happ/update/${app.Hash}`}>
                      <Button color="transparent" simple={simple} justIcon={justIcon}>
                        <EditIcon />
                      </Button>
                    </Link>
                  </Tooltip>
                </CardHoverUnder>

                 {/* <CardTitle>{app.Entry!.title}</CardTitle> */}
                <CardTitle>Card Title Goes Here</CardTitle>
                <CardCategory>
                  <CardSuccessText>
                      <CardDescription />
                      {/* <span>{app.Entry!.description}</span> */}
                     <span>Card Description Goes Here</span>
                  </CardSuccessText>
                </CardCategory>
              </CardBody>

              <CardFooter>
                <CardStats>
                  <AccessTime /> Last Updated: Card Time Update Goes Here
                  {/* <AccessTime /> Last Updated: {app.Entry!.created? app.Entry!.created : Date.now()} */}
                </CardStats>
              </CardFooter>
            </CardItem>
          </GridItem>
        )
      })

      return (
        <div style={{ textAlign: 'center' }}>
          {renderApps}
        </div>
      );
    }
  }


const mapStateToProps = ({ AllMyApps, currentProfile, currentAgent, appsByCategory, allAppCategories, currentCategory, currentAppHash }) => ({ AllMyApps, currentProfile, currentAgent, appsByCategory, allAppCategories, currentCategory, currentAppHash });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  fetchProfile: () => {
    return fetchPOST('/fn/profile/getProfile')
      .then(profileInfo => {
        dispatch({ type: 'FETCH_PROFILE', profileInfo })
      })
  },
  fetchAllApps: () => {
    fetchPOST('/fn/hchc/getMyApps')
      .then(allApps => {
        console.log("allApps returned from local chain-->",allApps)
        dispatch({ type: 'FETCH_ALL_APPS', allApps })
    })
},
  fetchAppDetails: (appHash) => {
    fetchPOST('/fn/happs/getAppDetails', appHash)
      .then( appDetails => {
        dispatch({ type: 'VIEW_APP', appDetails })
      })
  },
  getCurrentAppCategories: (appHash) => {
    fetchPOST('/fn/categories/getAppCategories', appHash)
      .then( currentAppCategories => {
        dispatch({ type: 'FETCH_CURRENT_APP_CATEGORIES', currentAppCategories })
      })
  },
  getappsByCategory: (category) => {
    fetchPOST('/fn/categories/getAppsByCategories', category)
      .then( appsByCurrentCategory => {
        dispatch({ type: 'FETCH_APPS_BY_CATEGORY', category, appsByCurrentCategory} )
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppData);

  // // Upload Product Image File Functionality !!:
  // public handleFileUpload = (event) => {
  //   event.preventDefault();
  //   console.log("uploaded img input event: ", event);
  //   const file = event.target.files[0];
  //
	// 	if (file) {
	// 		const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const result = reader.result;
  //       console.log("FILEREADER RESULT >> (IMG FILE) : result", result);
  //       // const fileObj = {file, fileurl: reader.result}
  //       this.setState({
  //         // newAvatarImg: fileObj,
  //         newAvatarImg: reader.result,
  //         imgPreview: reader.result
  //       })
  //     }
  //     reader.readAsDataURL(file);
	// 	};
  //   console.log("state: ", this.state);
  // }


  // public handleChange = (eventCurrentTarget: any) => {
  //      switch(eventCurrentTarget.id) {
  //        case "newEmail":
  //           this.setState({ newEmail: eventCurrentTarget!.value });
  //            break;
  //        case "newHandler":
  //            this.setState({ newHandler: eventCurrentTarget!.value });
  //            break;
  //       }
  //    }
