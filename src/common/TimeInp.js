/*
    reuseable time input component
    validates time inputted

    lifts state to parent component
*/

import React from "react";
//import React, { useState } from "react";

function isNumber(value) {
  const number = Number(value);
  return !isNaN(number); //&& String(value) === String(number))
}

export default function TimeInp(props) {
  //var date = new Date();
  //const [time, setTime] = useState(date.getHours() + ":" + date.getMinutes());
  function validateTime(time) {
    //split via colon to check each part
    const timeArr = time.split(":");
    if (timeArr.length !== 2) {
      return false;
    }
    //check for blank items or non-number items
    for (var val of timeArr) {
      if (!isNumber(val)) {
        return false;
      }
    }
    // check hours,mins,secs
    var [hours, mins] = timeArr;

    //check vals
    if (hours.length > 2 || mins.length > 2) {
      return false;
    }
    hours = parseInt(hours);
    mins = parseInt(mins);

    //console.log(hours + ":" + mins);

    //check numbers are valid times
    if (hours > 23 || hours < 0) {
      return false;
    } else if (mins > 59 || mins < 0) {
      return false;
    }
    return true;
  }

  function handleChange(event) {
    //console.log(event.target.value);
    if (validateTime(event.target.value)) {
      props.handleChange(event.target.value);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          position: "absolute",
          textAlign: "right",
          pointerEvents: "none",
          top: ".4em",
          right: "1em"
        }}
      >
        {props.day}
      </label>
      <input
        type="text"
        className="form-control"
        onChange={handleChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
}

TimeInp.defaultProps = {
  placeholder: "enter time",
  day: ""
};
