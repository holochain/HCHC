import * as React from 'react';
import {connect} from 'react-redux';
import { fetchPOST, uploadFileRequest, fetchFormPOST } from '../../utils';
import { ReduxAction, AppDNACode, AppDetailState, uiLinkParams } from '../../../../types';
import { Hash } from '../../../../holochain';
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
  returnState: () => void,
  attachUI: (uiFilLink, title, thumbnail, appHash) => void,
  attachDNA: (dnaFile, testFile, appHash) => void,
  addNewApp: (title, description, thumbnail, author) => void,
  uploadRequest: () => void,
  uploadFileSuccess: () => void,
  uploadFileError: () => void,
}

type inputState =  string | number | string[];
type SubmitButtonState = {
  errorMessage: string | undefined,
  title: inputState,
  description: inputState,
  category: inputState,
  appDNAfile: inputState,
  appTestFile: inputState,
  appUiLink: inputState,
  thumbnail: {url: "", fileName: ""} | undefined,
}

class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState>  {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: "",
      title: "",
      description: "",
      category: "",
      appDNAfile: "",
      appTestFile: "",
      appUiLink: "",
      thumbnail: {url: "", fileName: ""},
    };
    this.handleClick = this.handleClick.bind(this);
  }

    public submitForm = (stateItems) => {
      const formItems = stateItems;
      // this.handleCreateApp();
    }

    public handleClick = (parentStates) => {
      console.log("PARENT STATES to submit", parentStates);
      // this.submitForm(parentStates);
    }

  // public createAppObjects = async(event) => {
  //      event.preventDefault();
  //
  //      const AppDetailobj = {
  //        title: this.state.title,
  //        description: this.state.description,
  //        thumbnail: this.state.thumbnail
  //      }
  //      const AppUiobj = {
  //        uiLink: this.state.appUiLink
  //      }
  //      const AppDNAobj = {
  //        dnaFile: this.state.appDNAfile
  //      }
  //      const AppTestobj = {
  //        dnaFile: this.state.appTestFile
  //      }
  //      console.log("Here are the sent details: App Detail OBJECT: ", AppDetailobj);
  //      console.log("Here are the sent details: App Ui OBJECT: ", AppUiobj);
  //      console.log("Here are the sent details: App DNA OBJECT: ", AppDNAobj);
  //
  //      // TODO: call the CREATE NEW AP FUNCTION (HC API back end CALL) HERE!!!
  //      await this.handleCreateApp(AppDetailobj, AppUiobj, AppDNAobj, AppTestobj);
  //    }
  //
  //   public handleCreateApp = (detials, ui, dna, test) => {
  //      console.log("this.state", this.state);
  //      console.log("App Detail OBJECT: ", detials);
  //      console.log("App Ui OBJECT: ", ui);
  //      console.log("App Dna obJECT", dna);
  //      console.log("App Test obJECT", test);
  //
  //       const { agent } = this.props.currentAgent;
  //       const { description, title, thumbnail } = this.state;
  //       if (!description || !title || !thumbnail || !dna || !ui) {
  //         this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
  //       }
  //       else {
  //         fetchPOST('/fn/ratings/createApp', { title, description, thumbnail })
  //           .then(response => {
  //             if (response.errorMessage) {
  //               // TODO: IMPROVE ERROR MESSAGE
  //               this.setState({errorMessage: "Sorry, there was an error with the server. Review both details and resubmit."})
  //             }
  //             else {
  //               this.setState({ errorMessage: undefined });
  //               this.props.addNewApp(title, description, thumbnail, agent);
  //             }
  //           })
  //           .then(response => {
  //              console.log("THIS is the response after the 1ST '.then' instance...", response);
  //              this.props.attachDNA(dna, test, response);
  //              this.props.attachUI(ui, title, thumbnail, response);
  //           })
  //           .then(response => {
  //             console.log("thumbnail", thumbnail)
  //             // window.URL.revokeObjectURL(thumbnail.preview);
  //             console.log("THIS is the response after the 2ND '.then' instance...", response);
  //             location.assign(`/appstore/${response}`);
  //           })
  //      }
  //   }
  //
  //   public handleEnter = (event: React.KeyboardEvent) => {
  //     const { description, title, thumbnail, appDNAfile, appUiLink } = this.state;
  //     if (event.keyCode === 13 && description! && title! && thumbnail! && appDNAfile! && appUiLink! ) {
  //       this.createAppObjects(event);
  //     }
  //     else if (event.keyCode === 13) {
  //       this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."});
  //     }
  //   }


  public render() {
    console.log("this.props : ", this.props)
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
  addNewApp: ({title, description, thumbnail, author}) => {
    fetchPOST('/fn/hchc/createApp', { title, description, thumbnail })
        .then(appHash => {
          dispatch({ type: 'CREATE_NEW_APP_DETAILS', appHash})
      })
  },
  attachDNA: ({dnaFile, testFile, appHash}) => {
    fetchPOST('/fn/hchc/addAppCode', { dnaFile, testFile, appHash })
        .then(dnaFileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnaFileHash})
      })
  },
  attachUI: ({uiFilLink, title, thumbnail, appHash}) => {
    fetchPOST('/fn/hchc/addUISkin', { uiFilLink, title, thumbnail, appHash })
        .then(dnaFileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnaFileHash})
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
