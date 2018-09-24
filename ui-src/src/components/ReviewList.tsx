import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from "react";
import { connect } from 'react-redux';

import { Hash } from "../../../holochain";
import { AppDetailState } from "../../../types";
import { fetchPOST } from '../utils'

import "./ReviewList.css";

type ReviewListProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  fetchAgent: () => void,
  fetchAppReviews: () => void,
  fetchAppReviewsTemporary : () => void,
}

class ReviewList extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    const { agent } = this.props.currentAgent;
    const agentHash = agent.Hash;
    // TODO: USE this instead: this.props.fetchAppReviews(appHash);
    this.props.fetchAppReviewsTemporary(agentHash);
  }

  public renderCurrentReviewList() {
    if (!this.props.reviewEntries) {
      // console.log("!this.props.reviewEntries ?!", this.props.reviewEntries);
      return <div>
        This app has yet to be reviewed.
      </div>
    }
    else {
      const { reviewEntries } = this.props;
      console.log("reviewEntries", reviewEntries);
      console.log(typeof reviewEntries);

      return reviewEntries.map((entry) => {
        return (
          <li
            key={entry.authorHash+entry.rating+entry.review}
            className="list-group-item list-entry-item">
            {console.log(entry)}
            <h4>{entry.authorName}: <span>{entry.timestamp}</span></h4>
            <h5>{entry.rate}</h5>
            <h5>{entry.review}</h5>
          </li>
        );
      });
    }
  }

  public render() {
    return(
        <ul className="list-group">
          {this.renderCurrentReviewList()}
        </ul>
    );
  }
}

const mapStateToProps = ({ reviewEntries, currentAgent }) => ({ reviewEntries, currentAgent });
const mapDispatchToProps = dispatch => ({
fetchAppReviewsTemporary: (appHash) => {
  fetchPOST('/fn/ratings/getRatings', appHash)
    .then(reviewEntries => {
      console.log("getRatings response to send to reducer", reviewEntries);
      dispatch({ type: 'FETCH_REVIEWS', reviewEntries })
    })
  },
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
        dispatch({ type: 'FETCH_AGENT', agent })
      })
  },
  fetchAppReviews: (appHash) => {
    fetchPOST('/fn/ratings/getRatings', appHash)
      .then( reviewEntries => {
        console.log("getRatings response to send to reducer", reviewEntries);
        dispatch({ type: 'FETCH_REVIEWS', reviewEntries })
      })
  },
  returnState: () => dispatch({ type: 'RETURN_STATE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
