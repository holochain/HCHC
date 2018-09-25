import * as React from 'react';
import JdenticonPlaceHolder from '../components/JdenticonFiller';

import Dropzone from 'react-dropzone';

// import { DropzoneComponent } from 'react-dropzone-component';
// import "node_modules/react-dropzone-component/styles/filepicker.css";
// import "node_modules/dropzone/dist/min/dropzone.min.css";

import './UploadNewApp.css';
import { connect } from 'react-redux'
import { fetchPOST } from '../utils';



type UploadNewAppState = {
  errorMessage: string | undefined,
  title: string | number | string[] | undefined,
  description: string | number | string[] | undefined,
  fileload: string | number | string[] | undefined,
  uiCodeLink: string | number | string[] | undefined,
  thumbnail: string | undefined,
  thumbnailPreview: string | undefined,
  accepted: [{name: string, size: string | number}] | undefined,
  rejected:  [{name: string, size: string | number}] | undefined,
}

// const eventHandlers = {
//     init: null,
//     // All of these receive the event as first parameter:
//     drop: (file) => console.log("dropped file : ", file),
//     dragstart: null,
//     dragend: null,
//     dragenter: null,
//     dragover: null,
//     dragleave: null,
//     addedfile: (file) => console.log("added file : ", file),
//     removedFile: (file) => console.log("removed file : ", file),
//     thumbnail: null,
//     error: null,
//     processing: null,
//     uploadprogress: null,
//     sending: null,
//     success: null,
//     complete: (file) => console.log("complete : ", file),
//     canceled: null,
//     maxfilesreached: null,
//     maxfilesexceeded: null,
//     // All of these receive a list of files as first parameter and are only called
//     //  if the uploadMultiple option in djsConfig is true:
//     processingmultiple: null,
//     sendingmultiple: null,
//     successmultiple: null,
//     completemultiple: null,
//     canceledmultiple: null,
//     // Special Events
//     totaluploadprogress: null,
//     reset: null,
//     queuecomplete: () => (
//       setTimeout(function() {
//         location.reload()
//       }, 1000)
//     ),
// }
// const componentConfig = {
//     iconFiletypes: ['.jpg', '.png', '.gif'],
//     showFiletypeIcon: true,
//     postUrl: 'no-url',
//     uploadMultiple: true,
// };
// const djsConfig = { autoProcessQueue: false }
const handleDropRejected = (...args) => console.log('reject', args);

// const handleDrop = (...args) => console.log('accept', args);


class UploadNewApp extends React.Component<any, UploadNewAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      title: undefined,
      description: undefined,
      thumbnail: undefined,
      thumbnailPreview: undefined,
      fileload: undefined,
      uiCodeLink: undefined,
      accepted: undefined,
      rejected: undefined,
    };
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public onDrop = (files) => {
    console.log("onDrop File: ", files);
    // const parsedFiles = this.readURL(files);
    this.setState({
      thumbnailPreview: files
    });
    console.log("the hitherto accepted files: ", this.state.accepted);
  }

  public addNameToDataURI=(dataURL, name)=>{
    const uploadedFileNames: any = [] ;
    const fileURL = dataURL.replace(";base64", `;name=${name};base64`);
    uploadedFileNames.push(fileURL);
    console.log("uploadedFileNames", uploadedFileNames);
    this.setState({accepted: uploadedFileNames});
  }

  public render() {
    const required: boolean = true;
    let errorDisplay: JSX.Element | null = null;
    if (this.state.errorMessage) {
      errorDisplay = <div className="error-message">{ this.state.errorMessage }</div>
    }

    const preview = () => {
      const { thumbnailPreview, accepted, rejected } = this.state
      if(thumbnailPreview || rejected) {
        return (
          <aside>
            <h2 className="underline">Accepted files</h2>
            { thumbnailPreview! &&
              <img src={ thumbnailPreview! } width="100px" height="100" alt="image preview" />
            }
            <ul>
              { accepted ? accepted!.map(file => <li key={file.name}>{file.name}: {file.size} bytes</li>) : <div/> }
            </ul>
            <h2 className="underline">Rejected files</h2>
            <ul>
              { rejected ? rejected!.map(file => <li key={file.name}>{file.name}: {file.size} bytes</li>) : <div/> }
            </ul>
          </aside>
        )
      }
    }

    if (!this.props.currentAgent) {
      return <div/>
    }
    else {
      const { agent } = this.props.currentAgent;
      const { fileload } = this.state
      // console.log("fileload", fileload);
      return (
        <div className="create-app-form" onKeyUp={ this.handleEnter }>
          <h1 className="registration-header">Upload Your App Below</h1>
          <h4 className="app-author">Author: {agent.Name}</h4>
          <h4 className="app-author">Avatar:
              <JdenticonPlaceHolder className="jdenticon" size={100} hash={ agent.Hash } />
          </h4>
          <hr className="reg-hr"/>
          <br/>

          <form className="form-group" onSubmit={this.handleCreateAapp}>
            <label htmlFor="app-title">
              App Title
              <input id="app-title"
                value={this.state.title}
                className="register-input"
                placeholder="Application Title"
                type="text"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="app-description">
              App Description
              <textarea id="app-description"
                value={this.state.description}
                className="register-input"
                placeholder="Enter application description here..."
                wrap="soft"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="app-code">
              Upload App Code File
              <input id="app-code"
                value={this.state.fileload}
                className="register-input form-control"
                name="appCode"
                type="file"
                accept=".js, .ts, .json"
                required={required}
                onChange={this.handleChange}/>
            </label>
            <br/>
            <label htmlFor="ui-code">
              Upload UI Code File
              <input id="ui-code"
                value={this.state.uiCodeLink}
                className="register-input form-control"
                name="appCode"
                type="file"
                accept=".js, .ts, .json"
                required={required}
                onChange={this.handleChange}/>
            </label>
            {/* <br/>
            <label htmlFor="app-thumbnail">
              Upload App Thumbnail Picture
              <input id="app-thumbnail"
                value={this.state.fileload}
                className="register-input form-control"
                name="appCode"
                type="file"
                required={required}
                onChange={this.handleChange}/>
            </label> */}
            <br/>
            <br/>
            <br/>

            { preview() }

            <section>
              <label htmlFor="app-thumbnail">
                Upload App Thumbnail Picture
              {/* <DropzoneComponent
                config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
              /> */}
              <div className="dropzone">
                <Dropzone
                  id="app-thumbnail-dropzone"
                  className="app-thumbnail-dropzone"
                  aria-label="Upload App Thumbnail Picture."
                  accept="image/*"
                  multiple={ true }
                  onDrop={this.onDrop}
                  // onDrop={(accepted, rejected) => { console.log( "accepted:", accepted, "rejected:", rejected ); }}
                  onDropRejected={ handleDropRejected }
                >
                  <p>Drag an Thumbanil image file here or click to upload..</p>
                  <p>Only *.jpeg and *.png images will be Accepted.</p>
                </Dropzone>
              </div>
            </label>
            </section>

             <br/>
             <hr className="reg-hr"/>
             { errorDisplay }
             <hr className="reg-hr"/>
             <button><a href="/" className="modal-button">Close</a></button>
             <button className="modal-button" type="submit" value="Submit">Submit</button>
          </form>
         </div>
       )}
     }

     public handleChange = (event: any) => {
       switch(event.target.id) {
         case "title":
           this.setState({ title: event.target.value });
           break;
         case "description":
           this.setState({ description: event.target.value });
           break;
         case "app-code":
           console.log("app-code - on inputChange", event.target.value);
           console.log("app-code - on inputChange", event.target.files[0]);
           this.handleUploadFile(event.target.files[0]);
           this.setState({ fileload: event.target.files[0] });
          break;
         case "ui-code":
           console.log("ui-code - on inputChange", event.target.value);
           console.log("ui-code - on inputChange", event.target.files[0]);
           const uiLink = this.renderURLfromBlob(event.target.files);
           console.log("uiLink ???? : ", uiLink);
           // this.setState({ uiCodeLink: uiLink! });
           break;
       }
       // console.log("state: ", this.state);
     }


     public renderURLfromBlob = (input) => {
        const reader = new FileReader();
        // reader.readAsDataURL(input.files[0]);
        reader.readAsDataURL(input[0]);
         console.log("Filename: " + input[0].name);
         console.log("Type: " + input[0].type);
         console.log("Size: " + input[0].size + " bytes");

        reader.onloadend = () => {
            this.addNameToDataURI(reader.result, input[0].name);
        }
     }

     public handleUploadFile = (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('name', file.name);
        console.log("file data since upload", data);
        return data;
        // // '/files' is your node.js route that triggers our middleware
        // axios.post('/files', data).then((response) => {
        //   console.log(response); // do something with the response
        // });
    }

    // // For the followign: <input type="file" onChange={this.handleFileUpload} />
    //   public handleFileUpload = ({ files, name, extraPayload, url }) => {
    //     const file = files[0];
    //     this.props.actions.uploadFileRequest({
    //        file,
    //        name,
    //        extraPayload,
    //        url
    //     })
    //   }


     public handleCreateAapp = () => {
        // TODO: Preview the Product Image File Functionality:
        const acceptedFiles = this.renderURLfromBlob(this.state.accepted);
        console.log(acceptedFiles);
        console.log("this.state", this.state);

         const { description, title, thumbnail, fileload, uiCodeLink } = this.state;
         if (!description || !title || !thumbnail || !fileload || !uiCodeLink) {
           this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
         }
         else {
           fetchPOST('/fn/ratings/createApp', { title, description, thumbnail })
             .then(response => {
               if (response.errorMessage) {
                 // TODO: IMPROVE ERROR MESSAGE
                 this.setState({errorMessage: "Sorry, there was an error with the server. Review both details and resubmit."})
               }
               else {
                 this.setState({ errorMessage: undefined });
                 this.props.dispatch({ type: 'CREATE_NEW_APP_DETAILS', response });
               }
             })
             .then(response => {
                console.log("THIS is the response after the 1ST '.then' instance...", response);
                this.props.attachDNA(fileload, response);
                this.props.attachUI(uiCodeLink, title, thumbnail, response);
             })
             .then(response => {
               // window.URL.revokeObjectURL(file.preview);
               console.log("THIS is the response after the 2ND '.then' instance...", response);
               location.assign(`/appstore/${response}`);
             })
        }
     }

     private handleEnter = (event: React.KeyboardEvent) => {
       const { description, title, thumbnail } = this.state;
       if (event.keyCode === 13 && description! && title! && thumbnail! ) {
         this.handleCreateAapp();
       }
       else if (event.keyCode === 13) {
         this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."});
       }
     }

}

const mapStateToProps = ({currentAgent, currentAppHash, appCode, UIappLink}) => ({currentAgent, currentAppHash, appCode, UIappLink});
const mapDispatchToProps = dispatch => ({
  fetchAgent: () => {
    fetchPOST('/fn/whoami/getAgent')
        .then(agent => {
        dispatch({type: 'FETCH_AGENT', agent})// why does this only return agent, instead of both agent(hash) and identity(name) for that agent
      })
  },
  addNewApp: (title, description, thumbnail, author) => {
    fetchPOST('/fn/hchc/createApp', { title, description, thumbnail })
        .then(appHash => {
          dispatch({ type: 'CREATE_NEW_APP_DETAILS', appHash})
      })
  },
  attachDNA: (dnaFile, appHash) => {
    fetchPOST('/fn/hchc/addAppCode', { dnaFile, appHash })
        .then(dnaFileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnaFileHash})
      })
  },
  attachUI: (uiFileLink, title, thumbnail, appHash) => {
    fetchPOST('/fn/hchc/addUISkin', { uiFileLink, title, thumbnail, appHash })
        .then(dnaFileHash => {
        dispatch({type: 'ADD_DNA_FILE', dnaFileHash})
      })
  },
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadNewApp);


//  ======================================================
//     FOR THE APPLICATION CREATION POST:
//  ======================================================
// handleCreateAappNewApp = () => {
//   fetchPOST('/fn/applications/newApp', { author, description, thumbnail })
//     .then(response => {
//       if(response.errorMessage) {
//         this.setstate({errorMessage: "We were unable to load your app. Please try again."})
//       }
//       else {
//           this.setstate(errorMessage: null);
//           this.props.dispatch({ type: 'CREATE_NEW_APP', response}) // WHy is this one this.props.dispatch instead of just dispatch ???
//           //make a function to return to main page after creation... showing the new app...
//       }
//     })
// }
