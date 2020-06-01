import React, { Component } from "react";
// area to drag and drop files into
import Dropzone from "react-dropzone";
import DropdownSearch from "../../common/DropdownSearch";
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
      { value: "sha1", label: "sha1" },
      { value: "sha256", label: "sha256" },
      { value: "sha512", label: "sha512" },
      { value: "sha224", label: "sha224" },
      { value: "sha384", label: "sha384" },
      { value: "sha3", label: "sha3" },
      { value: "ripemd160", label: "ripemd160" }
    ];
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
    this.calcHashText(event.target.value);
  };

  handleSelect = selected => {
    this.setState({ currentAlgorithm: selected });
    console.log(selected);
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
    switch (this.state.currentAlgorithm) {
      case "md5":
        var hashed = CryptoJS.MD5(text).toString();
        break;
      case "sha1":
        var hashed = CryptoJS.SHA1(text).toString();
        break;
      case "sha256":
        var hashed = CryptoJS.SHA256(text).toString();
        break;
      case "sha512":
        var hashed = CryptoJS.SHA512(text).toString();
        break;
      case "sha224":
        var hashed = CryptoJS.SHA224(text).toString();
        break;
      case "sha384":
        var hashed = CryptoJS.SHA384(text).toString();
        break;
      case "sha3":
        var hashed = CryptoJS.SHA3(text).toString();
        break;
      case "ripemd160":
        var hashed = CryptoJS.RIPEMD160(text).toString();
        break;
      default:
        var hashed = "error";
    }
    console.log(hashed);
    this.setState({ hashed: hashed });
  };

  render() {
    return (
      <div className="container">
        <h1> hash a file or text </h1>
        <DropdownSearch
          options={this.algorithms}
          handleSelect={this.handleSelect}
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
