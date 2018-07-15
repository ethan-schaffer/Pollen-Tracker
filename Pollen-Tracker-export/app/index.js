import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";
import document from "document";
import clock from "clock";
import { geolocation } from "geolocation";
//geolocation.getCurrentPosition(locationSuccess, locationError);


function locationSuccess(position) {
    console.log("Latitude: " + position.coords.latitude,
                "Longitude: " + position.coords.longitude);
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}
// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("location");
const circle = document.getElementById("circle");
const oneDay = document.getElementById("tomorrow");
const twoDay = document.getElementById("two day");
const threeDay = document.getElementById("three day");
const weekDayOne = document.getElementById("day one");
const weekDayTwo = document.getElementById("day two");
const weekDayThree = document.getElementById("day three");


function setColor(item, color) {
  item.style.fill = color
}

function setColorIndex(item, index){
  if(index < 4.9) {
    setColor(item, "green");
  } else if(index < 7.3) {
    setColor(item, "yellow");
  } else {
    setColor(item, "red");
  }
}

messaging.peerSocket.onmessage = function(evt) {
  document.getElementById("location").text = JSON.stringify(evt['data'][0].CityState).substring(1,JSON.stringify(evt['data'][0].CityState).length-1);
  //console.log(JSON.stringify(evt['data']));
  var pollenIndex = JSON.stringify(evt['data'][0].Today);
  document.getElementById("pCount").text = "Pollen Index: "+pollenIndex;
  var pollenType = JSON.stringify(evt['data'][0].PredominantPollen);
  document.getElementById("pType").text = "Pollen Type: "+pollenType.substring(1,pollenType.length-1); 
  var index = parseInt(pollenIndex, 10);
  console.log(index)

  setColorIndex(circle, index)
  var maxHeight = 70
  
  var oneDayNumber = evt['data'][0].Tomorrow
  var twoDayNumber = evt['data'][0].TwoDays
  var threeDayNumber = evt['data'][0].ThreeDays
  
  var maxNumber = Math.max(oneDayNumber, twoDayNumber, threeDayNumber)
  var minNumber = Math.min(oneDayNumber, twoDayNumber, threeDayNumber)
  oneDay.height = maxHeight * oneDayNumber / maxNumber
  twoDay.height = maxHeight * twoDayNumber / maxNumber
  threeDay.height = maxHeight * threeDayNumber / maxNumber
  
  oneDay.y = 220 - oneDay.height
  twoDay.y = 220 - twoDay.height
  threeDay.y = 220 - threeDay.height
 
  if(oneDayNumber == maxNumber){
    setColor(oneDay, "red");
  } else if(oneDayNumber == minNumber){
    setColor(oneDay, "green")
  } else {
    setColor(oneDay, "yellow")
  }
  if(twoDayNumber == maxNumber){
    setColor(twoDay, "red");
  } else if(twoDayNumber == minNumber){
    setColor(twoDay, "green")
  } else {
    setColor(twoDay, "yellow")
  }
  if(threeDayNumber == maxNumber){
    setColor(threeDay, "red");
  } else if(threeDayNumber == minNumber){
    setColor(threeDay, "green")
  } else {
    setColor(threeDay, "yellow")
  }
}
let myClock = document.getElementById("myClock");

clock.granularity = 'seconds'; // seconds, minutes, hours

function weekDay(day) {  
  var days = ["S", "M", "T", "W", "T", "F", "S"]
  return days[day]
}

clock.ontick = function(evt) {
  var day = evt.date.getDay()
  console.log("day =" + day)
  weekDayOne.text = weekDay(day)
  weekDayTwo.text = weekDay(day+1)
  weekDayThree.text = weekDay(day+2)
  console.log(weekDayOne.text)
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                      ("0" + evt.date.getSeconds()).slice(-2);
};
