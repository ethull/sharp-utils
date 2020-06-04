import React, { Component } from "react";
import Navbar from "../../common/NavBar";
import TimeSearch from "../../common/TimeSearch";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <TimeSearch />

        <h1> time conversions </h1>
      </div>
    );
  }
}
