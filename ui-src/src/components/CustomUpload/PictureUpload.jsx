import React from "react";
import defaultImage from "../../assets/img/default-avatar.png";

class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imagePreviewUrl: defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const fileName = file.name;

    let fileUrl = "";
    reader.onload = () => {
      fileUrl = reader.result;
      console.log("fileURL : ", fileUrl);
    };

    reader.onloadend = () => {
      this.addNameToDataURI(fileUrl, fileName, reader);
      const {image} = this.state;
      this.props.onImageUpdate(image);
    };
    reader.readAsDataURL(file);
  }

  addNameToDataURI=(dataURL, name, reader) => {
    const fileObj = {
      imageData: dataURL,
      imageName: name
    }
    this.setState({
      image: fileObj,
      imagePreviewUrl: reader.result
    });
    console.log("this.state: ", this.state);
  }

  // in this function we can save the image (this.state.file) on form submit
  handleSubmit(e) {
    e.preventDefault();
    const avatar = this.state.file;  // this.state.file is the file/image uploaded
    console.log("avatar", avatar);
  }
  render() {
    return (
      <div className="picture-container">
        <div className="picture">
          <img
            src={this.state.imagePreviewUrl}
            className="picture-src"
            alt="..."
          />
          <input type="file" onChange={this.handleImageChange} />
        </div>
        <h6 className="description">Choose Picture</h6>
      </div>
    );
  }
}

export default PictureUpload;
