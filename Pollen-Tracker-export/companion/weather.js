export function Weather(apiKey) {
  this.apiKey = apiKey;
};


Weather.prototype.getJson = function() {
  let self = this;
  return new Promise(function(resolve, reject) {
    var zip = '75035'
    var url = "https://nasacort.com/Ajax/PollenResults.aspx?ZipCode=" + zip

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log("Got JSON response from server:" + JSON.stringify(json));

      let entries = json["Entries"]
      
      resolve(entries);
    }).catch(function (error) {
      reject(error);
    });
  });
}