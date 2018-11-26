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
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
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
    this.props.fetchAllApps();
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
          <h4 className="loading-text" style={{textAlign:"center", color:"#eee"}}>Loading...</h4>
        </div>
      }
      if (this.props.AllMyApps.length <= 0) {
        return <div>
          <h4 className="loading-text" style={{textAlign:"center", color:"#eee"}}>You don't yet have any hApps.  Please proceed to the Register Page via the sidebar menu to your left to register your first hApp.</h4>
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
          <AppComponentLayout key={app.Entry.uuid} hash={ app.Hash } title={app.Entry.title} description={app.Entry.description} thumbnail={app.Entry.thumbnail} lastUpdate={app.Entry.updated} />
        )
      });

      return (
        <GridContainer>
          {renderApps}
        </GridContainer>
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
  fetchAllApps: () => {
    fetchPOST('/fn/hchc/getMyApps')
      .then(myApps => {
        console.log("myApps returned from local chain-->",myApps)
        dispatch({ type: 'FETCH_ALL_APPS', myApps })
    })
},
  fetchAppDetails: (appHash) => {
    fetchPOST('/fn/happs/getAppDetails', appHash)
      .then( appDetails => {
        dispatch({ type: 'VIEW_APP', appDetails })
      })
  },
  // this retrieves the app Categories AND Tags (if avail)
  getCurrentAppCategories: (appHash) => {
    fetchPOST('/fn/categories/getAppCategories', appHash)
      .then( categories => {
        dispatch({ type: 'FETCH_CURRENT_APP_CATEGORIES', categories })
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
