import { geolocation } from "geolocation";
import * as util from "../common/utils";


export function Weather(apiKey) {
  this.apiKey = apiKey;
};


Weather.prototype.getJson = function(zipcode) {
  let self = this;
  return new Promise(function(resolve, reject) {
    var url = "https://nasacort.com/Ajax/PollenResults.aspx?ZipCode=" + zipcode
    console.log(url)
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log("Got JSON response from server:" + JSON.stringify(json));
      
      let entries = json["Entries"]
      
      if(JSON.stringify(entries) == "[]"){
        entries = {"CityState":"Can't Find Location",
                   "Today":"Can't Find Location",
                   "Tomorrow":"Can't Find Location",
                   "TwoDays":"Can't Find Location",
                   "ThreeDays":"Can't Find Location",
                   "PredominantPollen":"Can't Find Location",
                   "City":"Can't Find Location",
                   "State":"Can't Find Location"};      
      } else {
        console.log(JSON.stringify(entries))
      }
      resolve(entries);
    }).catch(function (error) {
      reject(error);
    });
  });
}

Weather.prototype.getZipcode = function() {
  let self = this;
  return new Promise(function(resolve, reject) {
    var lat = ""
    var lng = ""
    geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude
      lng = position.coords.longitude

      var locations = [[47, 9, "Manchester Township, NJ"], 
                       [30.2672, -97.7431, "Austin, TX"], 
                       [40.7128, -74.0060, "New York City, NY"]]
      var index = 1
      lat = locations[index][0]
      lng = locations[index][1]

      var url = "http://api.geonames.org/findNearbyPostalCodesJSON?lat="+lat+"&lng="+lng+"&username=ETHANSCHAFFER"
      
      console.log("Latitude: " + lat)
      console.log("Longitude: " + lng)
      console.log(url)
      fetch(url).then(function(response) {
//        console.log(response)
//        console.log(JSON.stringify(response.json()))
        return response.json();
      }).then(function(json) {
        
        let zipcode = util.padToFive(json.postalCodes[0].postalCode)
        
        console.log("Got zipcode response from server:" + zipcode);
        //zipcode = 78731
        
        resolve(zipcode);
      }).catch(function (error) {
        reject(error);
      });
    })
  });
}