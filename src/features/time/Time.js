import React, { Component } from "react";
import Navbar from "../../common/NavBar";
import DropdownSearch from "../../common/DropdownSearch";
import EfficientSearch from "../../common/EfficientSearch";
import moment from "moment-timezone";
import cityTimezones from "city-timezones";
import TimeInp from "../../common/TimeInp";

import "./Time.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    //this.state = this.props.location.state;
    this.cities = this.getCities();
    this.state = {
      searchMtd: "city",
      tzInp: "",
      tzOut: "",
      timeInp: "",
      timeOut: "",
      currentOptions: this.cities
    };
    this.ianaNames = this.getIanaTZs();
    this.offsets = this.getUTCoffsets();
  }

  getCities = () => {
    let cityObj = [];
    let cityMapping = cityTimezones.cityMapping;
    cityMapping.forEach(city => {
      delete city.city_ascii;
      delete city.lat;
      delete city.lng;
      delete city.pop;
      delete city.iso2;
      delete city.iso3;
      let objStr = `${city.country}, ${city.city}`;
      cityObj.push({ value: objStr, label: objStr });
    });
    return cityObj;
  };

  getIanaTZs = () => {
    let ianaObj = [];
    const ianaNames = moment.tz.names();
    ianaNames.forEach(name => {
      ianaObj.push({ value: name, label: name });
    });
    return ianaObj;
  };

  getUTCoffsets = () => {
    return [
      { label: "GMT-14:00", value: "GMT-14:00" },
      { label: "GMT-13:00", value: "GMT-13:00" },
      { label: "GMT-12:00", value: "GMT-12:00" },
      { label: "GMT-11:00", value: "GMT-11:00" },
      { label: "GMT-10:00", value: "GMT-10:00" },
      { label: "GMT-09:00", value: "GMT-09:00" },
      { label: "GMT-08:00", value: "GMT-08:00" },
      { label: "GMT-07:00", value: "GMT-07:00" },
      { label: "GMT-06:00", value: "GMT-06:00" },
      { label: "GMT-05:00", value: "GMT-05:00" },
      { label: "GMT-04:00", value: "GMT-04:00" },
      { label: "GMT-03:00", value: "GMT-03:00" },
      { label: "GMT-02:00", value: "GMT-02:00" },
      { label: "GMT-01:00", value: "GMT-01:00" },
      { label: "GMT+00:00", value: "GMT+00:00" },
      { label: "GMT+01:00", value: "GMT+01:00" },
      { label: "GMT+02:00", value: "GMT+02:00" },
      { label: "GMT+03:00", value: "GMT+03:00" },
      { label: "GMT+04:00", value: "GMT+04:00" },
      { label: "GMT+05:00", value: "GMT+05:00" },
      { label: "GMT+06:00", value: "GMT+06:00" },
      { label: "GMT+07:00", value: "GMT+07:00" },
      { label: "GMT+08:00", value: "GMT+08:00" },
      { label: "GMT+09:00", value: "GMT+09:00" },
      { label: "GMT+10:00", value: "GMT+10:00" },
      { label: "GMT+11:00", value: "GMT+11:00" },
      { label: "GMT+12:00", value: "GMT+12:00" },
      { label: "GMT+13:00", value: "GMT+13:00" },
      { label: "GMT+14:00", value: "GMT+14:00" }
    ];
  };

  getData = selected => {
    if (selected === "city") {
      this.setState({ currentOptions: this.cities });
    } else if (selected === "iana") {
      this.setState({ currentOptions: this.ianaNames });
    } else if (selected === "offset") {
      this.setState({ currentOptions: this.offsets });
    }
  };

  handleAlgSelect = selected => {
    this.setState({ selectAlg: selected });
    this.getData(selected);
  };

  handleTzInpSelect = selected => {
    this.setState({ tzInp: selected });
  };

  handleTzOutSelect = selected => {
    this.setState({ tzOut: selected });
  };

  handleTimeChange = time => {
    console.log(time);
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
                defaultInputValue={"city"}
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
              />
            </div>

            <div className="col">
              <EfficientSearch
                id="tzOut"
                options={this.state.currentOptions}
                handleSelect={this.handleTzOutSelect}
                placeholder="output timezone"
              />{" "}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TimeInp id="timeInp" />
            </div>
            <div className="col">
              <TimeInp id="timeOut" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
