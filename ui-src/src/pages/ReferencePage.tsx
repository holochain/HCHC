import * as React from 'react';
import * as redux from 'redux';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import store from '../store'
import { fetchPOST } from '../utils'
import { ReduxAction } from '../../../types';


type AppProps = {
  numClicks: number,
  texts: Array<string>,
  decrement: () => void,
  increment: () => void,
  fetchAllApps: () => void,
}

class App extends React.Component<AppProps, {}> {
  private text = React.createRef<HTMLInputElement>();

  public render() {
    const greeting: string = "Welcome to your brand new Typescript-enabled React+Redux app";
    return (
      <div style={{textAlign: 'center'}}>
        <img className="app-logo" src="/holo-logo.png" />
        <p>{ greeting }</p>
        <h1>{ this.props.numClicks }</h1>
        <div style={{margin: '20px auto'}}>
          <button onClick={ this.props.decrement }> - </button>
          <button onClick={ this.props.increment }> + </button>
        </div>
        {/* <div style={{textAlign: 'left', margin: 'auto', display: 'inline-block'}}>
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref={this.text} />
            <input type="submit" value="Say something"/>
          </form>
          <ul>
            { this.props.texts.map((text, i) => <li key={i}>{text}</li>) }
          </ul>
        </div> */}
      </div>
    );
  }

  public componentDidMount() {
    setInterval(this.props.fetchAllApps, 500)
  }

  private handleSubmit = e => {
    e.preventDefault()
    if (this.text.current) {
      fetchPOST('/fn/sampleZome/sampleEntryCreate', {
        text: this.text.current.value,
      }).then(() => this.text.current!.value = '')
    }
  }
}

const mapStateToProps = ({ numClicks, allApps }) => ({ numClicks, allApps })
const mapDispatchToProps = dispatch => ({
  fetchAllApps: () => {
    fetchPOST('/fn/applications/getAllApps')
    .then(apps => {
      dispatch({ type: 'FETCH_ALL_APPS' })
    })
  },
  increment: () => dispatch({type: 'INCREMENT'}),
  decrement: () => dispatch({type: 'DECREMENT'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
