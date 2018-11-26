import * as React from 'react';
import {connect} from 'react-redux'
// import * as express from 'express'
// import * as multer from 'multer'
// import * as fs from 'fs'
// import * as path from 'path'

import { fetchPOST, fetchFormPOST, uploadFileRequest } from '../../utils';  // the file upload resource code is located in this file...
import { ReduxAction, CodeParams, AppDetailState, uiLinkParams } from '../../../../types'
import { Hash } from '../../../../holochain';
import JdenticonPlaceHolder from '../../components/JdenticonFiller';

import Dropzone from 'react-dropzone';

import { Container, Col, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
// import './RegisterApp.css';

type RegisterAppsProps = {
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  appCode: CodeParams,
  UIappLink: uiLinkParams,
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

type RegisterAppState = {
  errorMessage: string | undefined,
  title: inputState,
  description: inputState,
  category: inputState,
  appDNAfile: inputState,
  appTestFile: inputState,
  appUiLink: inputState,
  thumbnail: {url: "", fileName: ""} | undefined,
  thumbnailPreview: {url: "", fileName: ""} | undefined
}

const handleDropRejected = (...args) => console.log('reject', args);

class  RegisterApp extends React.Component<RegisterAppsProps, RegisterAppState>  {
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
      thumbnailPreview: {url: "", fileName: ""}

    };
    this.handleChange = this.handleChange.bind(this);
    // this.props.createApp = this.props.createApp.bind(this);
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public handleChange = (event: any) => {
    switch(event.target.id) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "description":
        this.setState({ description: event.target.value });
        break;
      case "category":
        this.setState({ category: event.target.value });
        break;
      case "dnaUpload":
        console.log("app-dna-code - on inputChange", event.target.files[0]);
        // this.renderURLfromFile(event.target.files, "dna");
        this.uploadFile(event.target.files[0]);
        break;
      case "testUpload":
         // console.log("app-code - on inputChange", event.target.value);
         console.log("app-test-code - on inputChange", event.target.files[0]);
         this.renderURLfromFile(event.target.files, "test");
         break;
      case "linkUpload":
         console.log("app-test-code - on inputChange", event.target.files[0]);
         this.renderURLfromFile(event.target.files, "ui");
         break;
    }
  }

  /////////////////
  public genFormData = async (file) => {
    console.log("INSIDE THE AYSNC FUNCTION...")
    const formDataPromise = new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      // const keys = formData.get("file");
      // console.log("formData file keys : ", keys);
      resolve(formData)
    });

    const result = await formDataPromise;
    uploadFileRequest(result);
    console.log(result);
}

  public uploadFile = file => {
    this.genFormData(file);

   try {
    this.props.uploadRequest();
    // await uploadFileRequest(data);

    this.props.uploadFileSuccess();
    console.log('File uploaded successfully!');
   }
   catch (error) {
    this.props.uploadFileError();
    if (error.response) {
      console.log(error.response.data.message);
    } else {
      console.log('Something went wrong while uploading this file');
    }
  }
};

///////////////////////

  public handleUploadFile = (file) => {
    const data = new FormData();
    data.append('file', file, file.name);
    console.log("file data since upload", data);
    return data;
  }

  public renderURLfromFile = (input, contentType?) => {
     console.log("type of file ID: ", contentType);
     console.log("Filename: " + input[0].name);
     console.log("Type: " + input[0].type);
     console.log("Size: " + input[0].size + " bytes");

     let fileUrl = "";
     const fileName = input[0].name;

     const reader = new FileReader();
     reader.readAsDataURL(input[0]);
     reader.onload = () => {
       // console.log("reader : ", reader);
       createURL(reader.result);
     }
     const createURL = (filereader) => {
       fileUrl = filereader;
       console.log("fileURL : ", fileUrl);
     }

     reader.onloadend = () => {
         this.addNameToDataURI(fileUrl, fileName, contentType);
     }
  }
  public addNameToDataURI=(dataURL, name, contentType)=>{
    const fileURL = dataURL.replace(";base64", `;name=${name};base64`);
    if(contentType === "dna"){
      this.setState({ appDNAfile: fileURL });
    }
    else if(contentType === "test") {
      this.setState({ appTestFile: fileURL });
    }
    else if(contentType === "ui") {
      this.setState({ appUiLink: fileURL });
    }
    console.log("this.state: ", this.state);
  }

  public onDrop = (files, link?) => {
      console.log("onDrop File: ", files);
      const newURL = {
        url: files[0].preview,
        fileName: files[0].name
      }
      this.setState({
        thumbnailPreview: newURL,
        thumbnail: newURL,
     });

      console.log("the NEWLY accepted file in appUiLink: ", this.state.appUiLink);
      console.log("the NEWLY accepted file in thumbnail: ", this.state.thumbnail);
  }

   public createAppObjects = async(event) => {
     event.preventDefault();

     const AppDetailobj = {
       title: this.state.title,
       description: this.state.description,
       thumbnail: this.state.thumbnail
     }
     const AppUiobj = {
       uiLink: this.state.appUiLink
     }
     const AppDNAobj = {
       dnaFile: this.state.appDNAfile
     }
     const AppTestobj = {
       dnaFile: this.state.appTestFile
     }
     console.log("Here are the sent details: App Detail OBJECT: ", AppDetailobj);
     console.log("Here are the sent details: App Ui OBJECT: ", AppUiobj);
     console.log("Here are the sent details: App DNA OBJECT: ", AppDNAobj);

     // TODO: call the CREATE NEW AP FUNCTION (HC API back end CALL) HERE!!!
     await this.handleCreateApp(AppDetailobj, AppUiobj, AppDNAobj, AppTestobj);
   }

  public handleCreateApp = (detials, ui, dna, test) => {
     console.log("this.state", this.state);
     console.log("App Detail OBJECT: ", detials);
     console.log("App Ui OBJECT: ", ui);
     console.log("App Dna obJECT", dna);
     console.log("App Test obJECT", test);

      const { agent } = this.props.currentAgent;
      const { description, title, thumbnail } = this.state;
      if (!description || !title || !thumbnail || !dna || !ui) {
        this.setState({errorMessage: "Please be sure you've completed all the necessary infos before submiting."})
      }
      else {
        fetchPOST('/fn/hchc/createApp', { title, description, thumbnail })
          .then(response => {
            if (response.errorMessage) {
              // TODO: IMPROVE ERROR MESSAGE
              this.setState({errorMessage: "Sorry, there was an error with the server. Review both details and resubmit."})
            }
            else {
              this.setState({ errorMessage: undefined });
              this.props.addNewApp(title, description, thumbnail, agent);
            }
          })
          .then(response => {
             console.log("THIS is the response after the 1ST '.then' instance...", response);
             this.props.attachDNA(dna, test, response);
             this.props.attachUI(ui, title, thumbnail, response);
          })
          .then(response => {
            console.log("thumbnail", thumbnail)
            // window.URL.revokeObjectURL(thumbnail.preview);
            console.log("THIS is the response after the 2ND '.then' instance...", response);
            location.assign(`/appstore/${response}`);
          })
     }
  }

  public handleEnter = (event: React.KeyboardEvent) => {
    const { description, title, thumbnail, appDNAfile, appUiLink } = this.state;
    if (event.keyCode === 13 && description! && title! && thumbnail! && appDNAfile! && appUiLink! ) {
      this.createAppObjects(event);
    }
    else if (event.keyCode === 13) {
      this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."});
    }
  }

  public render() {
    const preview = () => {
      const { thumbnailPreview } = this.state
      if(thumbnailPreview) {
        console.log("thumbnailPreview", thumbnailPreview);
        return (
          <aside>
            <h2 className="underline">Preview App Thumbnail</h2>
            { thumbnailPreview! &&
              <img src={ thumbnailPreview!.url } width="100px" height="100" alt="image preview" />
            }
          </aside>
        )
      }
    }

    console.log("this.props : ", this.props);

    const { title, description, thumbnail, appUiLink, appDNAfile, } = this.state;
    const row : boolean = true;
    const multiple : boolean = true;
    const check : boolean = true;
    return (
      <Container className="form-overlay">
        <div className="CreateNewApp">
          <h2 className="title">Register New Application</h2>
          <Form className="form" onSubmit={this.createAppObjects}>
          <FormGroup row={row}>
            <Label for="firstName" sm={2}>Title</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                placeholder="Minersweeper"
                value={ title }
                onChange={ this.handleChange}
            />
            </Col>
          </FormGroup>
          <FormGroup row={row}>
            <Label for="description" sm={2}>Description</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="A clever twist on the classic game, Minesweeeper"
                value={ description }
                onChange={ this.handleChange}
            />
            </Col>
          </FormGroup>
          <FormGroup>
              <Label for="category" sm={2}>Category</Label>
             <Col sm={10}>
               <Input type="select" name="selectMulti" id="category" onChange={ this.handleChange } multiple={multiple}>
                 <option id="Games" value="games">Games</option>
                 <option id="Admin Tools" value="admintools">Admin Tools</option>
                 <option id="Dev Tools" value="devtools">Dev Tools</option>
                 <option id="Top Downloads" value="topdownloads">Top Downloads</option>
                 <option id="Movies" value="movies">Movies</option>
                 <option id="Educational" value="educational">Educational</option>
                 <option id="Finance" value="finance">Finance</option>
                 <option id="Leisure" value="Leisure">Leisure</option>
                 <option id="Music" value="music">Music</option>
               </Input>
             </Col>
         </FormGroup>
          <FormGroup row={row}>
            <Label for="linkUpload" sm={2}>UI Link</Label>
            <Col sm={10}>
              <Input type="file" name="file" id="linkUpload" onChange={ this.handleChange }/>
              <FormText color="muted">
                Place a url link to your ui files here.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row={row}>
            <Label for="testUpload" sm={2}>Test File</Label>
            <Col sm={10}>
              <Input type="file" name="file" id="testUpload" onChange={ this.handleChange }/>
              <FormText color="muted">
                Attach your app's core test files here.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row={row}>
            <Label for="dnaUpload" sm={2}>DNA File</Label>
            <Col sm={10}>
              <Input type="file" name="file" id="dnaUpload" onChange={ this.handleChange }/>
              <FormText color="muted">
                Attach your app's core DNA files here.
              </FormText>
            </Col>
          </FormGroup>
          {/* <FormGroup row={row}>
            <Label for="thumbnailUpload" sm={2}>Thumbnail</Label>
            <Col sm={10}>
              <Input type="file" name="file" id="thumbnailUpload" onChange={ this.handleDrop }/>
              <FormText color="muted">
                Upload the image that will best showcase your app.
              </FormText>
            </Col>
          </FormGroup> */}
          <FormGroup row={row}>
            <Label for="thumbnailUpload" sm={2}>Drag and Drop Thumbnail Picture</Label>
            <Col sm={10}>
              <div className="dropzone">
                <Dropzone
                  id="app-thumbnail-dropzone"
                  className="app-thumbnail-dropzone"
                  aria-label="Upload App Thumbnail Picture."
                  accept="image/*"
                  multiple={ true }
                  onDrop={this.onDrop}
                  onDropRejected={ handleDropRejected }
                >
                  <p>Drag an Thumbanil image file here or click to upload..</p>
                  <p>Only *.jpeg and *.png images will be Accepted.</p>
                </Dropzone>
              </div>
            </Col>
          </FormGroup>
          <br/>
          <br/>
          <br/>

          { preview() }

          <FormGroup check={check} row={row}>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({currentAgent, currentAppDetails, appCode, UIappLink}) => ({currentAgent, currentAppDetails, appCode, UIappLink});
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);

// // For the followign: <input type="file" onChange={this.handleFileUpload} />
  // public handleFileUpload = ({ files, name, extraPayload, url }) => {
  //   const file = files[0];
  //   this.props.uploadFileRequest({
  //      file,
  //      name,
  //      extraPayload,
  //      url
  //   })
  // }
