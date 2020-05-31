import React, { Component } from "react";
// area to drag and drop files into
import Dropzone from "react-dropzone";
//react searchable/filterable dropdown input
import Select from "react-select";
//cryptogrpagy module
import CryptoJS from "crypto-js";
import "./Hash.css";

export default class Hash extends Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.state = {
      unhashed: "",
      hashed: "",
      currentAlgorithm: ""
    };
    this.algorithms = [
      { value: "md5", label: "md5" },
      { value: "sha1", label: "sha1" }
    ];
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
    this.calcHashText(event.target.value);
  };

  handleSelection = selected => {
    this.setState({ currentAlgorithm: selected.value }, () =>
      console.log(this.state.currentAlgorithm)
    );
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
      <div className="container">
        <h1> hash a file or text </h1>
        <Select
          options={this.algorithms}
          value={this.state.currentAlgorithm}
          onChange={this.handleSelection}
        />
        <div className="dropzone">
          <Dropzone
            className="dropzone"
            id="dropzone"
            onDrop={this.onUpload}
            minSize={0}
            maxSize={1048576}
            multiple
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <section className="text-center">
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
        <textarea
          id="unhashed"
          className="textarea form-control"
          value={this.state.unhashed}
          onChange={this.handleChange}
          placeholder="enter text to hash"
        />
        <textarea
          className="textarea form-control"
          value={this.state.hashed}
          placeholder="hashed output"
          readOnly
        />
      </div>
    );
  }
}
