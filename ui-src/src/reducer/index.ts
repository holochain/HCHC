import { Hash } from '../../../holochain';
import {HCHCState, AppDetailState, CodeParams, ReviewLog, uiLinkParams, ReduxAction} from "../../../types";
import { Map } from "immutable"  // import { List, Map } from "immutable"

// const dummyAppEntry : AppDetailState = {
//   author: {Hash: "asofkdjsoi9726183aj913798olakj", Name: "Joel Ulahanna"},
//   thumbnail: "pic1.jpg",
//   description: "This hApp is a modern, real-time, multiplayer take on the classic game of Microsoft's Minesweeeper.  Invite your friends and play.",
//   title: "Minersweeper",
//   uuid: "asofkdjsoi9726183aj913798olakj",
// }


const defaultState: HCHCState = {
  currentAgent: null,
  AllMyApps: null,
  appsByCategory: null,
  currentCategory: null,
  currentAppDetails: null,
  appCode: null,
  UIappLink: null,
  allAppCategories: null,
  allAppTags: null,
  reviewEntries: [{}],
};

export default (oldState: HCHCState = defaultState, action: ReduxAction): HCHCState => {
  const state = {
    ...oldState
  };

  switch (action.type) {
    case 'RETURN_STATE': {
      // tslint:disable-next-line:no-console
      console.log({ ...state });
      return state;
    }

    case 'UPLOAD_FILE_REQUEST': {
      // tslint:disable-next-line:no-console
      console.log("upload attempt")
      console.log({ ...state });
      return state;
    }

    case 'UPLOAD_FILE_SUCCESS': {
      // tslint:disable-next-line:no-console
      console.log("upload success")
      console.log({ ...state });
      return state;
    }

    case 'UPLOAD_FILE_ERROR': {
      // tslint:disable-next-line:no-console
      console.log("upload error")
      console.log({ ...state });
      return state;
    }

    /////////////////////////////////////////

    case 'CREATE_NEW_APP_DETAILS': {
      console.log("INSIDE REDUCER >> Create New APP:  action.params : ", action.params);
      return state;
    }

    case 'CREATE_NEW_APP_CODE': {
      console.log("INSIDE REDUCER >> action.params : ", action.params);
      return state;
    }

    case 'CREATE_NEW_UI_FILE': {
      console.log("INSIDE REDUCER >> action.params : ", action.params);
      return state;
    }

    case 'ADD_CATEGORIES_AND_TAGS': {
      console.log("INSIDE REDUCER >> action.params : ", action.params);
      return state;
    }

// retrieve current app details :
    case 'VIEW_APP': {
      // if there is a currentAppDetails, then remove it to replace with following app (that was just clicked on...)
      if (state.currentAppDetails) {
        console.log("state.currentAppDetails", state.currentAppDetails);
        state.currentAppDetails = null;
      }
      console.log("the App Details (VIEW_APP) ACTION payload", action.details);
      const { author, thumbnail, description, title, uuid } = action.details;
      const Entry : AppDetailState = {
        author,
        thumbnail,
        description,
        title,
        uuid,
      }
      const appHash = state.currentAppDetails!.Hash;
      const currentAppDetails = {Entry, Hash:appHash};
      return {...state, currentAppDetails}
    }
    // For REVEIW, maybe use with comments? >>> : state.texts = action.entries.map(entry => entry.text);

    case 'FETCH_APP_CODE' : {
      if (!state.currentAppDetails) {break};
      // // if there is a appCode, then remove it to replace with following app (that was just clicked on...)
      // if (state.appCode) {
      //   console.log("state.appCode", state.appCode);
      //   state.appCode = null;
      // }
      console.log("the FETCH_APP_CODE payload", action);
      const appCode: CodeParams = action.code;
      console.log("INSIDE the REDUCER: fetching the app code >>>", appCode);
      return {...state, appCode}
    }

    case 'FETCH_APP_UI_LINK' : {
      if (!state.currentAppDetails) {break};
      // // if there is a UIappLink, then remove it to replace with following app (that was just clicked on...)
      // if (state.UIappLink) {
      //   console.log("state.UIappLink", state.UIappLink);
      //   state.UIappLink = null;
      // }
      console.log("the FETCH_APP_CODE payload", action);
      const UIappLink = action.ui;
      console.log("INSIDE the REDUCER: fetching the app ui link >>>", UIappLink);
      return {...state, UIappLink}
    }

    case 'FETCH_CURRENT_APP_CATEGORIES': {
      console.log("INSIDE REDUCER >> Current APP Categories (and tags) - action.categories : ", action.categories);
      return state;
    }

    case 'FETCH_REVIEWS': {
      const reviews: [ReviewLog] = action.reviewEntries;
      console.log(action);
      console.log("reviews", reviews);
      const reviewEntries: [ReviewLog] = reviews;

      return { ...state, reviewEntries};
    }
    /////////////////////////////

    case 'FETCH_ALL_APPS': {
      console.log(">>ln 134 in reducer, ALL APPs Action !!!!: ", action.myApps);
      if(action.myApps) {
        const AllMyApps = action.myApps;
        return { ...state, AllMyApps };
      }
      return {...state}
    }

    case 'GET_APPS_BY_CATEGORY': {
      console.log("INSIDE REDUCER >> action.AppsByCategory : ", action.appsByCurrentCategory);
      return state;
    }

    case 'REGISTER_CATEGORY': {
      const currentCategory = action.category;
      console.log("INSIDE REDUCER, currentCategory :", currentCategory);
      return {...state, currentCategory}
    }


  /////////////////////////////

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
