/**
 * This app detects your IP address and shows your location using Google Maps
 * using
 *  Google Maps API https://developers.google.com/maps/ //Alex
 *  ipinfo API https://ipinfo.io/developers //Alex
 *  Speech recognition. //Sarah
 *  Keypress detection //Sarah
 *  Speech synth //Sarah
//  *  Language detection //Alex
//  *  Region highlight //Alex
 */

let Url = "https://ipinfo.io/json";
async function getInfo(url) {
  const response = await fetch(url);
  return await response.json();
}

getInfo(Url)
  .then(ipInfo => console.log(ipInfo));

//Google maps
function initMap() {
  var place = {
    lat: -25.363,
    lng: 131.044
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: place
  });
  var marker = new google.maps.Marker({
    position: place,
    map: map
  });
}



/**
 *  Fetching stuff. Does the same thing as getInfo();
 */
// function getInfo() {
//   fetch(Url) // Call the fetch function passing the url of the API as a parameter
//     .then(function (response) {
//       return response.json();
//     }).then(function (data) {
//       console.log(data);
//     })
//     .catch(function () {
//       // This is where you run code if the server returns any errors
//     });
// }