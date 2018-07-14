import { me } from "companion";
import * as messaging from "messaging";

import { Weather } from "./weather.js"

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  sendPollenData();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

function sendPollenData() {
  let weather = new Weather();
  weather.getZipcode().then(function(zipcode){
    console.log(zipcode)
    weather.getJson(zipcode).then(function(entries) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Limit results to the number of tiles available in firmware
      messaging.peerSocket.send(entries);
    }
  }).catch(function (e) {
    console.log("error"); console.log(e)
  });
  }).catch(function (e) {
    console.log("error"); console.log(e)
  });
  
}