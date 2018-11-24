import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "../CustomButtons/Button.jsx";
import defaultImage from "../../assets/img/image_placeholder.jpg";
import defaultAvatar from "../../assets/img/placeholder.jpg";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleImageChange = ( event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    const fileName = file.name;

    let fileUrl = "";
    reader.onload = () => {
      fileUrl = reader.result;
      console.log("fileURL : ", fileUrl);
    };

    reader.onloadend = () => {
      this.addNameToDataURI(fileUrl, fileName, reader);
      // console.log(fileName);
      const {image} = this.state;
      this.props.onImageUpdate(image);
    };
    reader.readAsDataURL(file);
  }

  addNameToDataURI=(fileURL, fileName, reader) => {
    const fileObj = {
      imageData: fileURL,
      imageName: fileName
    }
    this.setState({
      image: fileObj,
      imagePreviewUrl: reader.result
    });
    console.log("this.state: ", this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const avatar = this.state.file;  // this.state.file is the file/image uploaded
    console.log("avatar", avatar);
  }

  handleClick() {
    this.refs.fileInput.click();
  }

  handleRemove() {
    this.setState({
      image: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    const {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps
    } = this.props;
    return (
      <div style={{width:"180px"}} className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.image === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
