/**
 * ---------------------------------Table of Contents-------------------------------------------
 * First API: ipInfo
 * Second API: Google Maps relocation
 * Last API: Language Detection?
 * ---------------------------------------------------------------------------------------------
 * This app detects your IP address and shows your location using Google Maps
 * using
 *  Google Maps API https://developers.google.com/maps/ //Alex
 *  ipinfo API https://ipinfo.io/developers //Alex
 *  Speech recognition. //Sarah
 *  ^^^ (Works on Chrome. Problems on Firefox. Probably not supported yet: https://caniuse.com/#feat=speech-recognition)
 *  Keypress detection //Sarah
 *  Speech synth //Sarah
 *  Language detection //Alex
 */

//  I am getting lost with functions again so I'll make it look like C++. Maybe it'll help me.
function Main() {
  // On click
  document.querySelector("#locate").addEventListener('click', function () {
    Speak("I'm trying to locate you");
    findMe();
  })
  let langInput = document.getElementById('langDetection');
  langInput.value = "Dzień dobry"; // Presetting the value so the tester does not have to look for other languages
  document.getElementById('langDetectionBtn').addEventListener('click', function (e) {
    e.preventDefault();
    detectLang(langInput.value);
  })
}

// Calling the Main. Nothing more. All logic is happening in Main();
document.addEventListener("DOMContentLoaded", function () {
  Main();
})

let Url = "https://ipinfo.io/json";
/** getInfo(url)
 * Grabbing the location using async method
 * @param {string} url
 * @returns {JSON}
 */
async function getInfo(url) {
  const response = await fetch(url);
  return await response.json();
}

/** findMe()
 * The core function
 * 1. Fetches the location info using ipInfo
 * 2. Sets the lat and lng AFTER (.then) the call comes back.
 *  (.loc comes as a string, hence the slicing)
 * 3. Set the place object.
 * 4. Center the map on the user.
 * 5. Set the zoom
 * 6. Put the marker down. (For some reason didn't do it automatically);
 * @returns {void};
 */
function findMe() {
  getInfo(Url)
    .then(ipInfo => {
      // ipInfo;
      let lattitude = ipInfo.loc.slice(0, 7);
      let lng = ipInfo.loc.slice(8, 15);
      let place = {
        lat: parseFloat(lattitude),
        lng: parseFloat(lng)
      }
      map.setCenter({
        lat: place.lat,
        lng: place.lng
      });
      map.setZoom(13);

      // Making the cursor move to a new location.
      let marker = new google.maps.Marker({
        position: place,
        map: map
      });
    });
}


/** Google maps
 * Init map function from Google Maps docs
 */
function initMap() {
  let place = {
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
  let marker = new google.maps.Marker({
    position: place,
    map: map
  });
}


/**
 *  Fetching stuff. Does the same thing as getInfo();
 *  Making the rest of the API work with this method would require me to rebuild a couple of other functions
 *    Therefore it's just console.logging()
 */
function getInfo2() {
  fetch(Url) // Call the fetch function passing the url of the API as a parameter
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

/** Fetches the API response as JSON
 * I'm not sure how to take the variable outside of .then() scope
 * therefore I'll just change the text here;
 * @param {string} query 
 * @returns {void}
 */
function detectLang(query) {
  fetch('http://apilayer.net/api/detect?access_key=abbdb2654186ebd4033601f9ed696a1b&query=' + encodeURIComponent(query))
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      document.getElementById("langDetectionResult").textContent = data.results[0].language_name;
    }).catch(function (err) {
      console.log(err);
    });
  // console.log(lang);
  // return lang;
}

// async function detectLang(query) {
//   const response = await fetch('http://apilayer.net/api/detect?access_key=abbdb2654186ebd4033601f9ed696a1b&query=' +
//     encodeURIComponent(query));
//     let data = await response.json();
//     document.getElementById("langDetectionResult").textContent = data.results[0].language_name;    
// }