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

messaging.peerSocket.onmessage = function(evt) {
  var cityName = JSON.stringify(evt['data'][0].City);
  document.getElementById("location").text = cityName.substring(1,cityName.length-1);
  //console.log(JSON.stringify(evt['data']));
  var pollenIndex = JSON.stringify(evt['data'][0].Today);
  document.getElementById("pCount").text = "Pollen Index: "+pollenIndex;
  var pollenType = JSON.stringify(evt['data'][0].PredominantPollen);
  document.getElementById("pType").text = "Pollen Type: "+pollenType.substring(1,pollenType.length-1); 
}



let myClock = document.getElementById("myClock");

clock.granularity = 'seconds'; // seconds, minutes, hours

clock.ontick = function(evt) {
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                      ("0" + evt.date.getSeconds()).slice(-2);
};
