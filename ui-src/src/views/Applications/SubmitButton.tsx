import * as React from 'react';
import {connect} from 'react-redux';
import { fetchPOST, uploadFileRequest, fetchFormPOST } from '../../utils';
import { ReduxAction, AppDNACode, AppDetailState, uiLinkParams } from '../../../../types';
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
  appCode: AppDNACode,
  UIappLink: uiLinkParams,
  submitButtonProps:{color: string, round: boolean},
  fetchAgent: () => void,
  fetchAppDetails: (appHash) => Promise<any>,
  returnState: () => void,
  attachUI: (uiFilLinkBundle) => void,
  attachDNA: (dnaFileBundle) => void,
  addNewApp: (detialBundle) => void,
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
      this.createAppObjects();
    }

    // public componentDidMount() {
    //   this.createAppObjects();
    // }

    public createAppObjects = () => {
      console.log("INSIDE createAppObjects");
      console.log("this.state", this.state);


      const { title, description, thumbnail } = this.state;
      if (title !== null && description !== null && thumbnail !== null) {
        // { title, description, thumbnail }
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
       console.log("App Dna obJECT", appDNAfile);
       console.log("App Ui OBJECT: ", appUiLink);

        if (!details || appDNAfile === null || appUiLink === null) {
          this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
        }
        else {
          fetchPOST('/fn/hchc/createApp', details)
            .then(response => {
              if (response.errorMessage) {
                this.setState({errorMessage: "Sorry, there was an error submitting your data. Review both details and resubmit."})
              }
              else {
                this.setState({ errorMessage: undefined });
                this.props.addNewApp(details);
              };
            })
            .then(response => {
              console.log("THIS is the response after the 1ST '.then' instance... [should be the new app hash]", response);
               this.props.fetchAppDetails(response).then(res => {
                 if(res.errorMessage) {
                   this.setState({ errorMessage: "Sorry, there was an error submitting your data." });
                 }
                 if(!res.errorMessage) {
                   // { UI-title, UI-link, UI-thumbnail, app_hash }
                 const uiTitle = this.state.title + "_default_ui"
                 const AppUiobj = {
                   title: uiTitle,
                   link: JSON.stringify(this.state.appUiLink),
                   // TODO: UPDATE the following thumbnail with the uploaded ui icon pic, once avail...
                   thumbnail: "ui-placeholder-pic.png",
                   app_hash: this.props.currentAppDetails!.Hash
                 }
                 console.log("AppUiobj for Details API CALL", AppUiobj);

                 // { dna, test, app_hash }
                 const AppDNAobj = {
                   dna: JSON.stringify(this.state.appDNAfile),
                   test: "",
                   app_hash:this.props.currentAppDetails!.Hash
                 }
                   console.log("AppDNAobjlobj for Details API CALL", AppDNAobj);

                   const CategoryAndTagObj = {
                     categories: this.state.categories,
                     tags: this.state.tags,
                     hash: this.props.currentAppDetails!.Hash
                   }
                   console.log("CategoryAndTagBundle for Category / Tag API CALL", CategoryAndTagObj);

                   this.props.attachUI(AppUiobj);
                   this.props.attachDNA(AppDNAobj);
                   this.props.addCategoriesAndTags(CategoryAndTagObj);
                 }
               });
            })
            .then(response => {
              this.successAlert();
              // alert("Congrats. You've offically registered an app.");

              const message = this.state.errorMessage;
              this.props.toggleErrorMessage(message);
              // location.assign(`/dashboard`);
            })
       }
    }

    public handleEnter = (event: React.KeyboardEvent) => {
      const { description, title, thumbnail, appDNAfile, appUiLink } = this.state;
      if (event.keyCode === 13 && title !== null && description !== null && thumbnail !== null && appDNAfile !== null && appUiLink !== null ) {
        this.createAppObjects();
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
          <Button {...this.props.submitButtonProps} onClick={() => this.handleClick(this.props.states)}>
            Submit
          </Button>
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
  fetchPOST('/fn/hchc/getAppDetails', appHash)
      .then(appDetails => {
      dispatch({type: 'VIEW_APP', appDetails})
    })
  },
  addNewApp: ( newAppBundle ) => {
    fetchPOST('/fn/hchc/createApp', newAppBundle)
      .then(appHash => {
        dispatch({ type: 'CREATE_NEW_APP_DETAILS', appHash})
    })
  },
  attachDNA: ( appDnaBundle ) => {
    fetchPOST('/fn/hchc/addAppCode', appDnaBundle)
        .then(dnaFileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnaFileHash})
      })
  },
  attachUI: (appUiBundle) => {
    fetchPOST('/fn/hchc/addUISkin', appUiBundle)
        .then(dnaFileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnaFileHash})
      })
  },
  addCategoriesAndTags: (categoryAndTagBundle) => {
    fetchPOST('/fn/categories/addCategory', categoryAndTagBundle)
        .then(categoryCommitHash => {
        dispatch({type: 'ADD_CATEGORIES_AND_TAGS', categoryCommitHash})
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
