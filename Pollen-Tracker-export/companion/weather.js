import { geolocation } from "geolocation";
import * as util from "../common/utils";


export function Weather(apiKey) {
  this.apiKey = apiKey;
};


Weather.prototype.getJson = function(zipcode) {
  let self = this;
  return new Promise(function(resolve, reject) {
    var url = "https://nasacort.com/Ajax/PollenResults.aspx?ZipCode=" + zipcode
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log("Got JSON response from server:" + JSON.stringify(json));

      let entries = json["Entries"]
      
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

      //lat = 47
      //lng = 9

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

        resolve(zipcode);
      }).catch(function (error) {
        reject(error);
      });
    })
  });
}