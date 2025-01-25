import React from "react";
import Card from "react-bootstrap/Card";
import imageCompression from "browser-image-compression";
import './imageCompressor.css'; // Link to the custom CSS file

export default class ImageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink: "",
      orignalImage: "",
      originalLink: "",
      clicked: false,
      outputFileName: "",
      uploadImage: false,
    };
  }

  handle = (e) => {
    const imageFile = e.target.files[0];
    this.setState({
      orignalLink: URL.createObjectURL(imageFile),
      orignalImage: imageFile,
      uploadImage: true,
      outputFileName: imageFile.name,
    });
  };

  click = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.orignalImage.size / 1024) {
      alert("Image is too small to compress further.");
      return;
    }

    imageCompression(this.state.orignalImage, options).then((compressed) => {
      this.setState({
        compressedLink: URL.createObjectURL(compressed),
        clicked: true,
      });
    });
  };

  render() {
    return (
      <div className="app-container">
        <h1 className="app-header">Image Compressor</h1>
        <div className="row app-content">
          {/* Original Image Section */}
          <div className="col-lg-6">
            <Card className="app-card">
              <Card.Img
                variant="top"
                src={this.state.orignalLink || "https://via.placeholder.com/300"}
                className="image-preview"
              />
              <Card.Body>
                <input
                  type="file"
                  accept="image/*"
                  className="btn btn-dark upload-btn"
                  onChange={this.handle}
                />
              </Card.Body>
            </Card>
          </div>

          {/* Compressed Image Section */}
          <div className="col-lg-6">
            <Card className="app-card">
              <Card.Img
                variant="top"
                src={this.state.compressedLink || "https://via.placeholder.com/300"}
                className="image-preview"
              />
              <Card.Body>
                <button
                  className="btn btn-primary compress-btn"
                  onClick={this.click}
                >
                  Compress
                </button>
                {this.state.clicked && (
                  <a
                    href={this.state.compressedLink}
                    download={this.state.outputFileName}
                    className="btn btn-success download-btn"
                  >
                    Download
                  </a>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
