import * as React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { fetchPOST } from '../utils';
import { Hash } from '../../../holochain';

type SettingsProps = {
  currentAgent: { Hash: Hash, Name: string },
  fetchAgent: () => void,
}

class AgentName extends React.Component<SettingsProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public render () {
    const {currentAgent} = this.props;

    if (!currentAgent){
      return <div/>
    }
    else {
      const truncatedName : string = `${currentAgent.Name.substring(0,15)}...`;
      return (
        <Typography
          style={{textAlign: "center", flexGrow: 1, paddingTop:"8px", color: "#00838d"}}
          variant="subheading">
          {currentAgent.Name.length >= 10 ? truncatedName : currentAgent.Name}
        </Typography>
      )
    }
  }
}

const mapStateToProps = ({ currentAgent }) => ({ currentAgent });
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/profile/getAgent')
      .then(agent => {
        // console.log("agent after api call action: ", agent);
        dispatch({ type: 'FETCH_CURRENT_AGENT', agent })
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentName);
