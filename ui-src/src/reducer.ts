import { Hash } from '../../holochain';
// import { List, Map } from "immutable"
import { Map } from "immutable"
import {HCHCAppState, AppDetailState, AppDNACode, ReviewLog, ReduxAction} from "../../types";


const defaultState: HCHCAppState = {
  currentAgent: null,
  AllApps: null,
  currentCategory: null,
  currentAppHash: "null",
  appsByCategory: null,
  currentAppDetails: null,
  appCode: null,
  reviewEntries: [{}],
};

export default (oldState: HCHCAppState = defaultState, action: ReduxAction): HCHCAppState => {
  const state = {
    ...oldState
  };

  switch (action.type) {
    case 'RETURN_STATE': {
      // tslint:disable-next-line:no-console
      console.log({ ...state });
      return state;
    }

    case 'REGISTER_CATEGORY': {
      const currentCategory = action.category;
      console.log("INSIDE REDUCER, currentCategory :", currentCategory);
      return {...state, currentCategory}
    }

    case 'REGISTER_APP_HASH': {
      const currentAppHash = action.appHash;
      console.log("INSIDE REDUCER, appHash", currentAppHash);
      return {...state, currentAppHash}
    }

    case 'CREATE_NEW_APP_DETAILS': {
      return state;
    }

    case 'CREATE_NEW_APP_CODE': {
      return state;
    }

    case 'CREATE_REVIEW': {
      // const { appId } = state.currentAppDetails;
      // tslint:disable-next-line:no-console
      console.log("action.params.appHash", action.params.appHash);
      // if (appId === null || appId !== action.params.appHash ){
      //   break;
      // }
      let newReview;
      const { reviewEntries } = state;
      console.log("action.params", action.params);
      // const check = Object.entries(reviewEntries)[0]
      const check = Object.keys(reviewEntries).length;
      // console.log(">>> reviewEntires.size", reviewEntries.size);
      // console.log(">>> reviewEntires.keys", Object.keys(reviewEntries));
      console.log(">>> reviewEntires.keys.length", check);
      // if ( check === 0 )
      if ( check === 0 || reviewEntries === null || reviewEntries === undefined ) {
        newReview = {};
        newReview = {
          authorHash: action.params.authorHash,
          authorName: action.params.authorName,
          rate: action.params.rating,
          review: action.params.review,
          timestamp: "Now"
        };
        newReview = [ newReview ];
        console.log("line 109 newReview", newReview);
        // tslint:disable-next-line:no-console
        // console.log({ newReview });

        return {
          ...state,
          reviewEntries: newReview,
        };
      }
      else {
        newReview = [{}];
        newReview = state.reviewEntries;
        newReview.push({
          authorHash: action.params.authorHash,
          authorName: action.params.authorName,
          rate: action.params.rating,
          review: action.params.review,
          timestamp: "Now"
        });
        // newReview = List(newReview);

        // tslint:disable-next-line:no-console
        // console.log( "newReview (List Version of newReview) >>> " );
        console.log({ newReview });
        return {
          ...state,
          reviewEntries: newReview
        };
      }
    }

    case 'GET_APPS_BY_CATEGORY': {
      console.log("INSIDE REDUCER >> action.category: ", action.category);
      console.log("INSIDE REDUCER >> action.AppsByCategory : ", action.appsByCurrentCategory);
      return state;
    }

    case 'FETCH_REVIEWS': {
      const reviews: [ReviewLog] = action.reviewEntries;
      console.log(action);
      console.log("reviews", reviews);
      const reviewEntries: [ReviewLog] = reviews;

      return { ...state, reviewEntries};
    }

    case 'FETCH_APP_CODE' : {
      if (!state.currentAppDetails) {break};
      if (state.appCode) {
        // tslint:disable-next-line:no-console
        console.log("state.appCode", state.appCode);
        // if there is a appCode, then remove it to replace with following app (that was just clicked on...)
        state.appCode = null;
      }
      console.log("the FETCH_APP_CODE payload", action);
      const { fileload } = action.code;
      console.log("fileload", fileload);

      // const hash = fileload.hash;
      // const code = fileload.CodeParams.dna;
      // const test = fileload.CodeParams.test;

      const appCode: AppDNACode = {
        fileload: Map({}),
        // fileload: Map<("Hash",{"dnaCode","testCode"})>,
      }
      return {...state}
    }

    case 'VIEW_APP': {
      if (state.currentAppDetails) {
        console.log("state.currentAppDetails", state.currentAppDetails);
        state.currentAppDetails = null;// if there is a currentAppDetails, then remove it to replace with following app (that was just clicked on...)
      }
      console.log("the App Details (VIEW_APP) ACTION payload", action.details);
      const { author, thumbnail, description, title, uuid } = action.details;
      const Entry:AppDetailState = {
        author,
        thumbnail,
        description,
        title,
        uuid,
      }
      const appHash = state.currentAppHash;
      const currentAppDetails = {Entry, Hash:appHash};
      return {...state, currentAppDetails}
    }
    // For REVEIW, maybe use with comments? >>> : state.texts = action.entries.map(entry => entry.text);

    case 'FETCH_ALL_APPS': {
      console.log(">>ln 164 in reducer, ALL APPs Action !!!!: ", action.allApps);
      const AllApps = action.allApps;
      return { ...state, AllApps };
    }

    case 'FETCH_AGENT': {
      console.log("Fetch AGENT Action: ", action);
      const { agent } = action;
      return {
        ...state,
        currentAgent: { agent }
      };
    }

    default:
    return state
  }
  return state
}
