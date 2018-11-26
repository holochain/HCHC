import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchPOST, uploadFileRequest, fetchFormPOST } from '../../utils';
import { ReduxAction, CodeParams, AppDetailState, uiLinkParams } from '../../../../types';
import { Hash } from '../../../../holochain';
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";
// core components
import Button from "../../components/CustomButtons/Button.jsx";
/*tslint:disable jsx-no-lambda*/

type SubmitButtonProps = {
  states: {},
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  appCode: CodeParams,
  UIappLink: uiLinkParams,
  submitButtonProps:{color: string, round: boolean},
  fetchAgent: () => void,
  fetchAppDetails: (appHash) => Promise<any>,
  returnState: () => void,
  attachUI: (uiFilLinkBundle) => void,
  attachDNA: (dnaFileBundle) => void,
  addNewApp: (detailBundle) => Promise<any>,
  addCategoriesAndTags: (categoryAndTagBundle) => void,
  uploadRequest: () => void,
  uploadFileSuccess: () => void,
  uploadFileError: () => void,
  toggleErrorMessage: (message) => void,
}

type inputState =  string | number | string[];
type SubmitButtonState = {
  title: inputState | null,
  description: inputState | null,
  categories: inputState | null,
  tags: inputState | null,
  appDNAfile: inputState | null,
  appUiLink: inputState | null,
  thumbnail: inputState | null,
  holoEnabled: boolean | null,
  dateAppCreated: inputState | null,
  errorMessage: string | undefined,
  alert: JSX.Element | null,
}

class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState>  {
  constructor(props: any) {
    super(props);
    this.state = {
      title: null,
      description: null,
      thumbnail: null,
      categories: [],
      tags: [],
      appDNAfile: null,
      appUiLink: null,
      holoEnabled: null,
      dateAppCreated: null,
      errorMessage: undefined,
      alert: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.successAlert = this.successAlert.bind(this);
    this.addData = this.addData.bind(this);
  }

    public handleClick = (parentStates) => {
      // console.log("PARENT STATES to submit", parentStates);
      const title : string = parentStates.selectedTitle
      const description : string = parentStates.selectedDescription
      const thumbnail : string = parentStates.selectedImage

      const categories : Array<string> = parentStates.multipleSelect;
      const tags: Array<string> = parentStates.tags;

      const dnaFile : string = parentStates.selectedDNAFile
      const uiFile : string = parentStates.selectedUIFile

      const holoEnabled : boolean = parentStates.holoEnabled
      const dateAppCreated : string = parentStates.selectedDate

      this.setState({
        title,
        description,
        thumbnail,
        categories,
        tags,
        appDNAfile: dnaFile,
        appUiLink: uiFile,
        holoEnabled,
        dateAppCreated
      })
      this.createAppDetailObject();
    }

    // public componentDidMount() {
    //   this.createAppDetailObject();
    // }

    public addData = (AppUiobj, AppDNAobj, CategoryAndTagObj, callback) => {
     this.props.attachUI(AppUiobj);
     this.props.attachDNA(AppDNAobj);
     this.props.addCategoriesAndTags(CategoryAndTagObj);
     callback(this);
    }

    public createAppDetailObject = () => {
      console.log("this.state", this.state);

      const { title, description, thumbnail } = this.state;
      if (title !== null && description !== null && thumbnail !== null) {
        // { title, description, thumbnail }

        console.log("this.state.thumbnail BEFORE STRINGIFIED... >> ", this.state.thumbnail);
         const AppDetailobj = {
         title: this.state.title,
         description: this.state.description,
         thumbnail: JSON.stringify(this.state.thumbnail)
         }
        this.handleCreateApp(AppDetailobj);
      };
   }

    public handleCreateApp = (details) => {
       // console.log("this.state", this.state);
       const { appDNAfile, appUiLink } = this.state;
       console.log("App Detail OBJECT: ", details);

        if (!details || appDNAfile === null || appUiLink === null) {
          this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
        }
        else {
          fetchPOST('/fn/hchc/createApp', details).then(response => {
            if (response.errorMessage) {
              this.setState({errorMessage: "Sorry, there was an error submitting your data. please review your details and resubmit."})
            }
            else {
              this.setState({ errorMessage: undefined });
              console.log("FIRST promise response after the 1ST api call [should be the new app hash]", response);
              const hashAsStringResponse = response.toString();

              fetchPOST('/fn/hchc/getAppDetails', {app_hash:hashAsStringResponse}).then((res) => {
                console.log("hashAsStringResponse", hashAsStringResponse);
                console.log("SECOND promise response after the 2ND api call [should be the new app details]", res);
                 if (res.errorMessage) {
                   this.setState({ errorMessage: "Sorry, there was an error retrieving your app data." });
                 }
                 else if (!res.errorMessage) {
                   // { UI-title, UI-link, UI-thumbnail, app_hash }
                   const uiTitle = this.state.title + "_default_ui"
                   const AppUiobj = {
                     title: uiTitle,
                     link: JSON.stringify(this.state.appUiLink),
                     // TODO: UPDATE the following thumbnail with the uploaded ui icon pic, once avail...
                     thumbnail: "ui-placeholder-pic.png",
                     // the following should be "res.Hash"
                     app_hash: hashAsStringResponse
                   }
                   console.log("AppUiobj for UI API CALL", AppUiobj);

                   // { dna, test, app_hash }
                   const AppDNAobj = {
                     dna: JSON.stringify(this.state.appDNAfile),
                     test: "",
                     app_hash: hashAsStringResponse
                   }
                  console.log("AppDNAobjlobj for DNA API CALL", AppDNAobj);

                   const CategoryAndTagObj = {
                     category: this.state.categories,
                     tags: this.state.tags,
                     hash: hashAsStringResponse
                   }
                   console.log("CategoryAndTagBundle for Category / Tag API CALL", CategoryAndTagObj);

                   this.addData(AppUiobj, AppDNAobj, CategoryAndTagObj, function(this) {
                       // this.successAlert();
                       alert("Congrats. You've offically registered an app.");
                   })
                 };
               })
            };
        });
      };
      if(this.state.errorMessage !== undefined) {
        this.props.toggleErrorMessage(this.state.errorMessage);
      }
    }

    public handleEnter = (event: React.KeyboardEvent) => {
      const { description, title, thumbnail, appDNAfile, appUiLink } = this.state;
      if (event.keyCode === 13 && title !== null && description !== null && thumbnail !== null && appDNAfile !== null && appUiLink !== null ) {
        this.createAppDetailObject();
      }
      else if (event.keyCode === 13) {
        this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."});
      }
    }

    public hideAlert() {
      this.setState({
        alert: null
      });
    }

    public successAlert = () => {
      const success: boolean = true;
      this.setState({
        alert: (
          <SweetAlert
            success={success}
            style={{ display: "block", marginTop: "-100px" }}
            title="Success!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.submitButtonProps
            }
          >
            Congrats you have successfully registered your application!
          </SweetAlert>
        )
      });
    }


  public render() {
    return (
      <div className="text-center">
        <Link to={`/registerapp`}>
          <Button {...this.props.submitButtonProps} onClick={() => this.handleClick(this.props.states)}>
            Submit
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({currentAgent}) => ({currentAgent});
const mapDispatchToProps = dispatch => ({
  uploadRequest: () =>  dispatch({type: 'UPLOAD_FILE_REQUEST'}),
  uploadFileSuccess: () =>  dispatch({type: 'UPLOAD_FILE_SUCCESS'}),
  uploadFileError: () =>  dispatch({type: 'UPLOAD_FILE_ERROR'}),
  fetchAgent: () => {
  fetchPOST('/fn/whoami/getAgent')
      .then(agent => {
      dispatch({type: 'FETCH_AGENT', agent})
    })
  },
  fetchAppDetails: (appHash) => {
  return fetchPOST('/fn/hchc/getAppDetails', appHash)
      .then(details => {
      dispatch({type: 'VIEW_APP', details})
    })
  },
  addNewApp: ( newAppBundle ) => {
    return fetchPOST('/fn/hchc/createApp', newAppBundle)
      .then(params => {
        dispatch({ type: 'CREATE_NEW_APP_DETAILS', params});
    })
  },
  attachDNA: ( appDnaBundle ) => {
    return fetchPOST('/fn/hchc/addAppCode', appDnaBundle)
        .then(params => {
        dispatch({type: 'CREATE_NEW_APP_CODE', params}) // params = dna commit hash
      })
  },
  attachUI: (appUiBundle) => {
    return fetchPOST('/fn/hchc/addUISkin', appUiBundle)
        .then(params => {
        dispatch({type: 'CREATE_NEW_UI_FILE', params}) // params = ui commit hash
      })
  },
  addCategoriesAndTags: (categoryAndTagBundle) => {
    return fetchPOST('/fn/categories/addCategory', categoryAndTagBundle)
        .then(params => {
        dispatch({type: 'ADD_CATEGORIES_AND_TAGS', params}) // params = dna commit hash
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
