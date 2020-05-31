import React, { Component } from "react";
import Dropzone from "react-dropzone";
import CryptoJS from "crypto-js";
import "./Hash.css";

export default class Hash extends Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.state = {
      unhashed: "",
      hashed: ""
    };
  }

  handleChange = event => {
    console.log(event.target.id);
    console.log(event.target.value);
    this.setState({ [event.target.id]: event.target.value });
    console.log(this.state.unhashed);
    console.log(this.state);
  };

  onUpload = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        this.calcHashFile(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  calcHashFile = file => {
    this.calcHashText(CryptoJS.lib.WordArray.create(file));
  };

  calcHashText = text => {
    var hashed = CryptoJS.SHA1(text).toString();
    console.log(hashed);
    this.setState({ hashed: hashed });
  };

  render() {
    return (
      <div>
        <h1> hash a file or text </h1>
        <div className="container">
          <div className="dropzone">
            <Dropzone
              className="dropzone"
              id="dropzone"
              onDrop={this.onUpload}
              minSize={0}
              maxSize={1048576}
              multiple
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject
              }) => (
                <section className="dropzoneCentre">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && "Click or drop a file to hash"}
                    {isDragActive && !isDragReject && "hash file"}
                    {isDragReject && "File is too large!"}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <input
            type="text"
            value={this.state.unhashed}
            onChange={this.handleChange}
            id="unhashed"
            placeholder="enter text to hash"
          />
          <div> hash output </div>
          <input type="text" value={this.state.hashed} readOnly />
        </div>
      </div>
    );
  }
}
