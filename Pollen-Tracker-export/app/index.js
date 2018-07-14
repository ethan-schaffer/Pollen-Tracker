import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { geolocation } from "geolocation";
import * as messaging from "messaging";

// Update the clock every second
clock.granularity = "seconds";


// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

messaging.peerSocket.onmessage = function(evt) {
  myLabel.text = JSON.stringify(evt)
}
