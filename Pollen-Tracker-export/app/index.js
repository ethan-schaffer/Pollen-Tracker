import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { geolocation } from "geolocation";
// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

function getJson(url){
  fetch(url).then(function(response) {
      return response.json();
    })
}


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());
  myLabel.text = `${hours}:${mins}:${seconds}`;
  geolocation.getCurrentPosition(function(position) {
   console.log(position.coords.latitude + ", " + position.coords.longitude);
  })
  var json = getJson(url)
  console.log(json)
  
}
