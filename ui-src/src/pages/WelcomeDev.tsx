import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import './WelcomeDev.css';

import JdenticonPlaceHolder from '../components/JdenticonFiller';

import store from '../store'
import { fetchPOST } from '../utils'
import { WelcomeMsg, AppDetailState, ReduxAction } from '../../../types';

import { Hash } from '../../../holochain';

type WelcomeDevProps = {
  allApps: Map<Hash,string>,
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentApp: AppDetailState | null,
  fetchAgent: () => void,
  fetchAllApps: () => void,
  bridgetoAppDetails: (appHash) => void
}

class WelcomeDev extends React.Component<WelcomeDevProps, {}> {
  // private appHash: React.RefObject<any> = React.createRef();
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    this.props.fetchAgent();
    this.props.fetchAllApps();
    // setInterval(this.props.fetchAllApps, 500);
  }

  public handleSelectApp = event => {
    const appHash = event.target.ref;
    console.log("selected appHash", appHash);
    this.props.bridgetoAppDetails(appHash);
  }

  public render() {
    const greeting: WelcomeMsg = "Welcome to the Developer Console";
    if (!this.props.currentAgent) {
      return <div/>
    }
    else {
      const { agent } = this.props.currentAgent;
      const { allApps } = this.props;
      console.log("allApps", allApps);

        const uploadedApps = this.props.allApps
          // .sortBy(a => a.category)
          .forEach((hash, i) =>
            <Link to={`/appstore/${hash}`}>
              {/* if using ref's the react way, use the following format:  ref={ this.appHash } */}
              <div key={i} className="appstore-app-icons" ref={hash}  onClick={this.handleSelectApp}>
                {/* // BELOW> : The App Icon should instead pass the App Hash into the hash prop,... (not the whoami Hash). */}
                <JdenticonPlaceHolder className="jdenticon" size={150} hash={ hash } />
                
                {console.log("welcomeDev forEach App >> hash", hash)}
                {/* <img src={`/public/${icon}.png`} /> */}
              </div>
            </Link>
          )

      return (
          <div style={{ textAlign: 'center' }}>
            <h1 className="all-apps-header">{ greeting }</h1>
            <img className="app-logo" src="/holo-logo.png" />
            <h2>Uploaded Applications:</h2>
            <hr/>
            { uploadedApps }
        </div>
      );
    }
  }
}

const mapStateToProps = ({ allApps, currentAgent }) => ({ allApps, currentAgent });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  bridgetoAppDetails: (appHash) => {
    fetchPOST('/fn/bridge_request/getApp', appHash)
      .then( appDetials => {
        dispatch({ type: 'VIEW_APP', appDetials })
      })
  },
  fetchAllApps: () => {
    fetchPOST('/fn/hchc/getAllApps')
      .then(() => {
        dispatch({ type: 'FETCH_ALL_APPS' })
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDev);
