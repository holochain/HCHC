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
import GridItem from "../../components/Grid/GridItem.jsx";
import AppComponentLayout from "./AppComponentLayout";

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


class AppDataArray extends React.Component<AppComponentProps, {}>  {
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
          <AppComponentLayout key={app.Entry.uuid} hash={ app.Hash } title={app.Entry.title} description={app.Entry.description} image={app.Entry.thumbnail} lastUpdate={app.Entry.updated} />
        )
      });

      return (
        <GridItem xs={12} sm={6} md={4}>
          {renderApps}
        </GridItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppDataArray);
