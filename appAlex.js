/**
 * This app detects your IP address and shows your location on a  Google Map
 * using
 *  Google Maps API https://developers.google.com/maps/ //Alex
 *  ipinfo API https://ipinfo.io/developers //Alex
 *  Speech recognition. //Sarah
 *  Keypress detection //Sarah
 *  Speech synth //Sarah
//  *  Language detection //Alex
//  *  Region highlight //Alex
 */

//  I am getting lost with functions again so I'll make it look like C++. Maybe it'll help me.
function Main() {
  // findMe();
}

// Calling the Main. Nothing more. All logic is happening in Main();
document.addEventListener("DOMContentLoaded", function () {
  Main();
})

// Grabbing the location
let Url = "https://ipinfo.io/json";
async function getInfo(url) {
  const response = await fetch(url);
  return await response.json();
}

// Changing the location
function findMe() {
  getInfo(Url)
    .then(ipInfo => {
      ipInfo;
      let lattitude = ipInfo.loc.slice(0, 7);
      let lng = ipInfo.loc.slice(8, 15);
      map.setZoom(13);
      let place = {
        lat: parseFloat(lattitude),
        lng: parseFloat(lng)
      }
      map.setCenter({
        lat: place.lat,
        lng: place.lng
      });

      // Making the cursor move to a new location.
      let marker = new google.maps.Marker({
        position: place,
        map: map
      });
    });
}


/** Google maps
 * Init map function from Google Maps
 */
function initMap() {
  var place = {
    lat: -25.363,
    lng: 131.044
    // Barrie's location
    // lat: 44.4001,
    // lng: -79.666
  };
  map = new google.maps.Map(document.getElementById('map'), {
    // I made it a global so I can use it in out events
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
 *  Making the rest of the API work with this method would require me to rebuild a couple of other functions
 *    Therefore it's just console.logging()
 */
// function getInfo() {
//   fetch(Url) // Call the fetch function passing the url of the API as a parameter
//     .then(function (response) {
//       return response.json();
//     }).then(function (data) {
//       console.log(data);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }