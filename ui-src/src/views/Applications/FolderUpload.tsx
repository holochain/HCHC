import * as React from 'react';
import {connect} from 'react-redux';
import { CodeParams, AppDetailState, uiLinkParams } from '../../../../types';
import { Hash } from '../../../../holochain';
// core components
import Button from "../../components/CustomButtons/Button.jsx";
/*tslint:disable jsx-no-lambda*/
/*tslint:disable jsx-no-string-ref*/

type FolderUploadProps = {
  addButtonProps:{color: string, round: boolean},
  changeButtonProps:{color: string, round: boolean},
  removeButtonProps:{color: string, round: boolean},
  currentAgent: {agent: {Hash: Hash, Name: string}},
  currentAppDetails: {Entry: AppDetailState, Hash: Hash},
  appCode: CodeParams,
  UIappLink: uiLinkParams,
  returnState: () => void,
  uploadRequest: () => void,
  uploadFileSuccess: () => void,
  uploadFileError: () => void,
  onFileUpdate: (folder) => void,
}

type inputState =  string | number | string[];
type FolderUploadState = {
  folder: inputState | null,
  allFilesListing: Array<inputState> | null,
  errorMessage: string | undefined,
}

class FolderUpload extends React.Component<FolderUploadProps, FolderUploadState>  {
  constructor(props: any) {
      super(props);
      this.state = ({
        folder: null,
        allFilesListing: null,
        errorMessage: "",
      });
      this.handleChange = this.handleChange.bind(this);
    }

    public handleChange = (event: any) => {
     const allFiles : Array<any> = [];
       for (const file of Array.from(event.target.files)) {
         allFiles.push((file as any).webkitRelativePath);
       };

       this.setState({
         allFilesListing: allFiles
        });
        console.log("uploaded allFilesListing : ", this.state.allFilesListing);

      // this.props.onFileUpdate(this.state.folder);
      // console.log("uploaded folder : ", this.state.folder);
    };

    public handleClick() {
      (this.refs as any).folderInput.click();
    }

    public handleRemove() {
      this.setState({
        allFilesListing: null
      });
      (this.refs as any).folderInput.value = null;
    }

  public render() {
    const {folder} = this.state;
    const multiple : boolean = true;
    const webkitdirectory : boolean = true;
    console.log("folder >> ", folder);
    let i = 0;
    return (
      <div className="folderinput text-center">
          <input id="linkUpload" type="file" name="folderInput" onChange={this.handleChange} ref="folderInput" multiple={multiple}/>  // webkitdirectory={webkitdirectory}
          <div>
            {this.state.folder === null ? (
              <Button {...this.props.addButtonProps} onClick={() => this.handleClick()}>Select File</Button>
            ) : (
              <span>
                <div>
                  <span style={{fontSize: "75px", color: "Mediumslateblue"}}>
                    <i className="fas fa-file-code"/>
                  </span>
                  <ul>{this.state.allFilesListing ?
                    ( this.state.allFilesListing.map((file )=> {
                        i++;
                        return(<li key={i}>{file}</li>)
                      })
                    ) : (<div/>)}
                  </ul>
                </div>
                <Button {...this.props.changeButtonProps} onClick={() => this.handleClick()}>Change File</Button>
                <br/>
                <Button {...this.props.removeButtonProps} onClick={() => this.handleRemove()}>
                  <i className="fas fa-times" /> Remove
                </Button>
              </span>
            )}
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({currentAgent}) => ({currentAgent});
const mapDispatchToProps = dispatch => ({
  uploadRequest: () =>  dispatch({type: 'UPLOAD_FILE_REQUEST'}),
  uploadFileSuccess: () =>  dispatch({type: 'UPLOAD_FILE_SUCCESS'}),
  uploadFileError: () =>  dispatch({type: 'UPLOAD_FILE_ERROR'}),
  returnState: () => dispatch({type: 'RETURN_STATE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderUpload);
