import { geolocation } from "geolocation";


export function Weather(apiKey) {
  this.apiKey = apiKey;
};


Weather.prototype.getJson = function(zipcode) {
  let self = this;
  return new Promise(function(resolve, reject) {
  //  var zip = '80336'
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
})
    console.log(lat+"--- ++"+lng)
    var url = "http://api.geonames.org/findNearbyPostalCodesJSON?lat="+lat+"&lng="+lng+"&username=ETHANSCHAFFER"
   console.log(url)
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log("Got zipcode response from server:" + json.postalCodes[0].postalCode);

      let zipcode = json.postalCodes[0].postalCode
      
      resolve(zipcode);
    }).catch(function (error) {
      reject(error);
    });
  });
}