import moment from "moment-timezone";
import cityTimezones from "city-timezones";

var localTimeZ = moment.tz.guess();

//check if no number on side of the colon
//check if time is convertable, if leading 0s missing add
export function checkTime(time) {
  var [hours, mins] = time.split(":");
  if (hours === "" || mins === "") {
    return [false, ""];
  } else {
    if (hours.length === 1) hours = "0" + hours;
    if (mins.length === 1) mins = "0" + mins;
    return [true, hours + ":" + mins];
  }
}

export function convertTimes(timeInp, tzInp, tzOut) {

  var prevTimeZ = tzInp.tz;
  var nextTimeZ = tzOut.tz;
  const currentDate = moment(timeInp, "hh:mm").format();
  //timeInp = "1970-02-02 " + timeInp;

  //since we convert time -> time and not date -> date
  //- we only need to know if a time conversion ends up on the prev or next day
  const inTimeMO = moment.tz(currentDate, prevTimeZ);
  const startDay = inTimeMO.day();
  const outTimeMO = inTimeMO.tz(nextTimeZ);
  const endDay = outTimeMO.day();

  const outTime = outTimeMO.format("HH:mm");
  var outDay = "";
  if (startDay === endDay - 1) outDay = "next";
  else if (startDay === endDay + 1) outDay = "prev";

  return [outTime, outDay];
}

export function getCities() {
  let cityObj = [];
  let cityMapping = cityTimezones.cityMapping;
  cityMapping.forEach(city => {
    delete city.city_ascii;
    delete city.lat;
    delete city.lng;
    delete city.pop;
    delete city.iso2;
    delete city.iso3;
    let countryAbbv = city.country;
    if (countryAbbv === "United States of America") countryAbbv = "USA";
    else if (countryAbbv === "United Arab Emirates") countryAbbv = "UAE";
    let vlStr = `${city.country}, ${city.city}`;
    let lbStr = `${countryAbbv}, ${city.city}`;
    //cityObj.push({ value: objStr, label: objStr, type: "city" });
    cityObj.push({
      tz: city.timezone,
      value: vlStr,
      label: lbStr,
      type: "city"
    });
  });
  //add local time
  cityObj.push({
    tz: localTimeZ,
    value: localTimeZ,
    label: "local",
    type: "local"
  });
  return [
    cityObj,
    { tz: localTimeZ, value: localTimeZ, label: "local", type: "local" }
  ];
}

export function getIanaTZs() {
  let ianaObj = [];
  const ianaNames = moment.tz.names();
  ianaNames.forEach(name => {
    ianaObj.push({ tz: name, value: name, label: name, type: "iana" });
  });
  ianaNames.push({
    tz: localTimeZ,
    value: localTimeZ,
    label: "local",
    type: "iana"
  });
  return ianaObj;
}

export function getUTCoffsets() {
  var offsets = [
    {
      tz: "Etc/GMT+14",
      value: "Etc/GMT+14",
      label: "GMT-14:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT+13",
      value: "Etc/GMT+13",
      label: "GMT-13:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT+12",
      value: "Etc/GMT+12",
      label: "GMT-12:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT+11",
      value: "Etc/GMT+11",
      label: "GMT-11:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT+10",
      value: "Etc/GMT+10",
      label: "GMT-10:00",
      type: "offset"
    },
    { tz: "Etc/GMT+9", value: "Etc/GMT+9", label: "GMT-09:00", type: "offset" },
    { tz: "Etc/GMT+8", value: "Etc/GMT+8", label: "GMT-08:00", type: "offset" },
    { tz: "Etc/GMT+7", value: "Etc/GMT+7", label: "GMT-07:00", type: "offset" },
    { tz: "Etc/GMT+6", value: "Etc/GMT+6", label: "GMT-06:00", type: "offset" },
    { tz: "Etc/GMT+5", value: "Etc/GMT+5", label: "GMT-05:00", type: "offset" },
    { tz: "Etc/GMT+4", value: "Etc/GMT+4", label: "GMT-04:00", type: "offset" },
    { tz: "Etc/GMT+3", value: "Etc/GMT+3", label: "GMT-03:00", type: "offset" },
    { tz: "Etc/GMT+2", value: "Etc/GMT+2", label: "GMT-02:00", type: "offset" },
    { tz: "Etc/GMT+1", value: "Etc/GMT+1", label: "GMT-01:00", type: "offset" },
    { tz: "Etc/GMT+0", value: "Etc/GMT+0", label: "GMT+00:00", type: "offset" },
    { tz: "Etc/GMT-1", value: "Etc/GMT-1", label: "GMT+01:00", type: "offset" },
    { tz: "Etc/GMT-2", value: "Etc/GMT-2", label: "GMT+02:00", type: "offset" },
    { tz: "Etc/GMT-3", value: "Etc/GMT-3", label: "GMT+03:00", type: "offset" },
    { tz: "Etc/GMT-4", value: "Etc/GMT-4", label: "GMT+04:00", type: "offset" },
    { tz: "Etc/GMT-5", value: "Etc/GMT-5", label: "GMT+05:00", type: "offset" },
    { tz: "Etc/GMT-6", value: "Etc/GMT-6", label: "GMT+06:00", type: "offset" },
    { tz: "Etc/GMT-7", value: "Etc/GMT-7", label: "GMT+07:00", type: "offset" },
    { tz: "Etc/GMT-8", value: "Etc/GMT-8", label: "GMT+08:00", type: "offset" },
    { tz: "Etc/GMT-9", value: "Etc/GMT-9", label: "GMT+09:00", type: "offset" },
    {
      tz: "Etc/GMT-10",
      value: "Etc/GMT-10",
      label: "GMT+10:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT-11",
      value: "Etc/GMT-11",
      label: "GMT+11:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT-12",
      value: "Etc/GMT-12",
      label: "GMT+12:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT-13",
      value: "Etc/GMT-13",
      label: "GMT+13:00",
      type: "offset"
    },
    {
      tz: "Etc/GMT-14",
      value: "Etc/GMT-14",
      label: "GMT+14:00",
      type: "offset"
    }
  ];
  //add an option with the users local timezone
  const localOffset = moment.tz(localTimeZ).format("Z");
  const matchingObj = offsets.filter(
    obj => obj.label.replace("GMT", "") === localOffset
  )[0];
  offsets.push({ value: matchingObj.value, label: "local", type: "local" });
  return offsets;
}
