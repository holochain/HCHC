import * as React from 'react';
import {connect} from 'react-redux'

import { fetchPOST, fetchFormPOST } from '../utils';
import JdenticonPlaceHolder from '../components/JdenticonFiller';

import * as utils from '../utils';  // the file upload resource code is located in this file...
import Dropzone from 'react-dropzone';
import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'

import { Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback, } from 'reactstrap';
// // import './RegisterApp.css';
// import './UploadNewApp.css';

type RegisterAppState = {
  errorMessage: string | undefined,
  title: string | number | string[] | undefined,
  description: string | number | string[] | undefined,
  appDNAfile: string | number | string[] | undefined,
  appUiLink: string | number | string[] | undefined,
  thumbnail: string | undefined,
  thumbnailPreview: string | undefined,
}

class  ReigsterApp extends React.Component<CreateNewCertificateState, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      title: undefined,
      description: undefined,
      thumbnail: undefined,
      thumbnailPreview: undefined,
      appDNAfile: undefined,
      appUiLink: undefined,
      errorMessage: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createApp = this.createApp.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public onDrop = (files) => {
    console.log("onDrop File: ", files);
    // const parsedFiles = this.readURL(files);
    this.setState({
      thumbnailPreview: files,
      thumbnail: files,
    });
    console.log("the hitherto accepted files in thumbnail: ", this.state.thumbnail);
  }

  public addNameToDataURI=(dataURL, name)=>{
    const uploadedFileNames: any = [] ;
    const fileURL = dataURL.replace(";base64", `;name=${name};base64`);
    uploadedFileNames.push(fileURL);
    console.log("uploadedFileNames", uploadedFileNames);
    this.setState({accepted: uploadedFileNames});
  }

  // handleChange = async (event) => {
  //   const { value, name } = event.target;
  //   await this.setState({
  //     [ name ]: value,
  //   });
  // }
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
        this.setState({ appDNAfile: event.target.files[0] });
       break;
      case "ui-code":
        console.log("ui-code - on inputChange", event.target.value);
        console.log("ui-code - on inputChange", event.target.files[0]);
        const uiLink = this.renderURLfromBlob(event.target.files);
        console.log("uiLink ???? : ", uiLink);
        // this.setState({ appUiLink: uiLink! });
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


 public reateAppObjects = async(event) => {
   event.preventDefault();
   this.validateEmail(this.state.email);

   const AppDetailobj = {
     title: this.state.firstName,
     description: this.state.lastName,
     thumbnail: this.state.entityId
   }
   const AppUiobj = {
     uiLink: this.state.file
   }
   const AppDNAobj = {
     dnaFile: this.state.file
   }
   console.log("Here are the sent details: App Detail OBJECT: ", AppDetailobj);
   console.log("Here are the sent details: App Ui OBJECT: ", AppUiobj);
   console.log("Here are the sent details: App DNA OBJECT: ", AppDNAobj);
   // TODO: call the CREATE NEW AP FUNCTION (HC API back end CALL) HERE!!!
   // await >> calling the function...
 }

  public handleCreateAapp = () => {
     console.log("this.state", this.state);
      const { description, title, thumbnail, appDNAfile, appUiLink } = this.state;
      if (!description || !title || !thumbnail || !appDNAfile || !appUiLink) {
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
             this.props.attachDNA(appDNAfile, response);
             this.props.attachUI(appUiLink, title, thumbnail, response);
          })
          .then(response => {
            // window.URL.revokeObjectURL(file.preview);
            console.log("THIS is the response after the 2ND '.then' instance...", response);
            location.assign(`/appstore/${response}`);
          })
     }
  }

  public handleEnter = (event: React.KeyboardEvent) => {
    const { description, title, thumbnail, appDNAfile, appUiLink } = this.state;
    if (event.keyCode === 13 && description! && title! && thumbnail! && appDNAfile! && appUiLink! ) {
      this.handleCreateAapp();
    }
    else if (event.keyCode === 13) {
      this.setState({errorMessage: "Please be sure you've completed your review before pressing enter."});
    }
  }

  render() {
    const { title, description, thumbnail, appUiLink, appDNAfile, } = this.state;
    const row : boolean = true;
    const check : boolean = true;
    return (
      <Container className="CreateNewApp">
        <h2 className="title">Register New Application</h2>
        <Form className="form" onSubmit={this.createApp}>
        <FormGroup row={row}>
          <Label for="firstName" sm={2}>Title</Label>
          <Col sm={10}>
            <Input
              type="text"
              name="title"
              id="title"
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
              value={ notes }
              onChange={ this.handleChange}
          />
          </Col>
        </FormGroup>
        <FormGroup row={row}>
          <Label for="fileUpload" sm={2}>Thumbanil</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="fileUpload" onChange={ this.handleFileUpload }/>
            <FormText color="muted">
              Upload the image that will best showcase your app.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row={row}>
          <Label for="fileUpload" sm={2}>UI Link</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="fileUpload" onChange={ this.handleFileUpload }/>
            <FormText color="muted">
              Place a url link to your ui files here.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row={row}>
          <Label for="fileUpload" sm={2}>DNA File</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="fileUpload" onChange={ this.handleFileUpload }/>
            <FormText color="muted">
              Attach your app's core DNA files here.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup check={check} row={row}>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Container>
    );
  }
}

export default  ReigsterApp;
