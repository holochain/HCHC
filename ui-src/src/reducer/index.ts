import { Hash } from '../../../holochain';
import {HCHCState, AppDetailState, AppDNACode, ReviewLog, uiLinkParams, ReduxAction} from "../../../types";
import { Map } from "immutable"  // import { List, Map } from "immutable"

const dummyAppEntry : AppDetailState = {
  author: {Hash: "asofkdjsoi9726183aj913798olakj", Name: "Joel Ulahanna"},
  thumbnail: "pic1.jpg",
  description: "My First App is a game app.  Invite your firends and play.",
  title: "My First App",
  uuid: "asofkdjsoi9726183aj913798olakj",
}


const defaultState: HCHCState = {
  currentAgent: null,
  MyApps: [{Entry: dummyAppEntry, Hash: "87687olkjhliuyt765476yuhgi677ty8oui"}],
  currentAppDetails: null,
  reviewEntries: [{}],
  currentCategory: null,
  appsByCategory: null,
  appCode: null,
  UIappLink: null,
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

    case 'REGISTER_CATEGORY': {
      const currentCategory = action.category;
      console.log("INSIDE REDUCER, currentCategory :", currentCategory);
      return {...state, currentCategory}
    }

    case 'CREATE_NEW_APP_DETAILS': {
      return state;
    }

    case 'CREATE_NEW_APP_CODE': {
      return state;
    }

    case 'GET_APPS_BY_CATEGORY': {
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
      const { code } = action;
      console.log("INSIDE the REDUCER: fetching the app code >>>", code);

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
      const appHash = state.currentAppDetails!.Hash;
      const currentAppDetails = {Entry, Hash:appHash};
      return {...state, currentAppDetails}
    }
    // For REVEIW, maybe use with comments? >>> : state.texts = action.entries.map(entry => entry.text);

    case 'FETCH_ALL_APPS': {
      console.log(">>ln 164 in reducer, ALL APPs Action !!!!: ", action.myApps);
      const MyApps = action.myApps;
      return { ...state, MyApps };
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
