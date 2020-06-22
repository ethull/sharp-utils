import React, { Component } from "react";
import Navbar from "../../common/NavBar";
import DropdownSearch from "../../common/DropdownSearch";
import EfficientSearch from "../../common/EfficientSearch";
import TimeInp from "../../common/TimeInp";

import {
  checkTime,
  convertTimes,
  getCities,
  getIanaTZs,
  getUTCoffsets
} from "./TimeLogic";
import "./Time.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    //get list of cities, and a default city to choose first
    [this.cities, this.defaultCity] = getCities();
    this.state = {
      searchMtd: "city",
      tzInp: this.defaultCity,
      tzOut: this.defaultCity,
      timeInp: "",
      timeOut: "",
      timeInpDay: "",
      timeOutDay: "",
      currentOptions: this.cities
    };
    //fetch rest of options for react-select
    this.ianaNames = getIanaTZs();
    this.offsets = getUTCoffsets();
    //inital times values
    const date = new Date();
    const dateStr = checkTime(date.getHours() + ":" + date.getMinutes())[1];
    this.state.timeInp = dateStr;
    this.state.timeOut = dateStr;
  }

  getData = selected => {
    if (selected.value === "city") {
      this.setState({ currentOptions: this.cities });
    } else if (selected.value === "iana") {
      this.setState({ currentOptions: this.ianaNames });
    } else if (selected.value === "offset") {
      this.setState({ currentOptions: this.offsets });
    }
  };

  // check updated selection options and reload tz selects
  handleAlgSelect = selected => {
    this.setState({ searchMtd: selected.value });
    this.getData(selected);
  };

  handleTzInpSelect = selected => {
    this.setState({ tzInp: selected }, () =>
      this.handleTimeInpChange(this.state.timeInp)
    );
  };

  handleTzOutSelect = selected => {
    this.setState({ tzOut: selected }, () =>
      this.handleTimeOutChange(this.state.timeOut)
    );
  };

  // update inputted times and convert opposing time inp
  handleTimeInpChange = time => {
    this.setState({ timeInp: time });
    //check if time is convertable (user may still need to enter a value), and make quick changes if neccesary
    var [convertable, formattedTime] = checkTime(time);
    if (convertable) {
      var [outTime, outDay] = convertTimes(
        formattedTime,
        this.state.tzInp,
        this.state.tzOut
      );
      this.setState({ timeOut: outTime });
      this.setState({ timeOutDay: outDay });
      this.setState({ timeInpDay: "" });
    }
  };

  handleTimeOutChange = time => {
    this.setState({ timeOut: time });
    var [convertable, formattedTime] = checkTime(time);
    if (convertable) {
      var [outTime, outDay] = convertTimes(
        formattedTime,
        this.state.tzOut,
        this.state.tzInp
      );
      this.setState({ timeInp: outTime });
      this.setState({ timeInpDay: outDay });
      this.setState({ timeOutDay: "" });
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1> time conversions </h1>
          <div className="row">
            <div className="col-6">
              <DropdownSearch
                id="selectAlg"
                options={[
                  { label: "city", value: "city" },
                  { label: "iana", value: "iana" },
                  { label: "offset", value: "offset" }
                ]}
                handleSelect={this.handleAlgSelect}
                placeholder="search method"
                defaultInputValue="city"
              />{" "}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <EfficientSearch
                id="tzInp"
                options={this.state.currentOptions}
                handleSelect={this.handleTzInpSelect}
                placeholder="input timezone"
                defaultInputValue={this.defaultCity.label}
              />
            </div>

            <div className="col">
              <EfficientSearch
                id="tzOut"
                options={this.state.currentOptions}
                handleSelect={this.handleTzOutSelect}
                placeholder="output timezone"
                defaultInputValue={this.defaultCity.label}
              />{" "}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TimeInp
                id="timeInp"
                handleChange={this.handleTimeInpChange}
                value={this.state.timeInp}
                day={this.state.timeInpDay}
              />
            </div>
            <div className="col">
              <TimeInp
                id="timeOut"
                handleChange={this.handleTimeOutChange}
                value={this.state.timeOut}
                day={this.state.timeOutDay}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
