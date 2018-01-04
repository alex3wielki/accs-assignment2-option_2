/**
 * ---------------------------------Table of Contents-------------------------------------------
 *
 * /////////////////////////////// I WILL ATTEMPT A CONVERSION TO VUE \\\\\\\\\\\\\\\\\\\\\\\\\\
 *
 * First API: ipInfo
 * Second API: Google Maps relocation
 * Last API: Language Detection
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

var map = null;
function initMap() {
  const place = {
    lat: -25.363,
    lng: 131.044
    // Barrie's location
    // lat: 44.4001,
    // lng: -79.666
  };
  map = new google.maps.Map(document.getElementById("map"), {
    // I made it a global so I can use it in out events
    zoom: 4,
    center: place
  });
  const marker = new google.maps.Marker({
    position: place,
    map
  });
}

var appAlex = new Vue({
  el: "#root",
  data: {
    Url: "https://ipinfo.io/json",
    Language: "",
    LangInput: "Dzień dobry"
    //TODO
    // map: null
  },
  mounted: function() {
    initMap();
  },
  methods: {
    editLangOutput: function(e) {
      e.preventDefault();
      appAlex.detectLang(this.LangInput);
    },

    speakAndFind: function() {
      // Speak("I'm trying to locate you");
      appAlex.findMe();
    },

    /** getInfo(url)
     * Grabbing the location using async method
     * @param {string} url
     * @returns {JSON}
     */
    getInfo: async function(url) {
      const response = await fetch(url);
      return await response.json();
    },

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

    findMe: function() {
      appAlex.getInfo(appAlex.Url).then(ipInfo => {
        // ipInfo;
        let lattitude = ipInfo.loc.slice(0, 7);
        let lng = ipInfo.loc.slice(8, 15);
        let place = {
          lat: parseFloat(lattitude),
          lng: parseFloat(lng)
        };
        map.setCenter({
          lat: place.lat,
          lng: place.lng
        });
        map.setZoom(13);

        // Making the cursor move to a new location.
        let marker = new google.maps.Marker({
          position: place,
          map: map
          // map: this.map
        });
      });
    },

    /** Google maps
     * Init map function from Google Maps docs
     */
    initMap: function() {
      var place = {
        lat: -25.363,
        lng: 131.044
        // Barrie's location
        // lat: 44.4001,
        // lng: -79.666
      };
      this.map = new google.maps.Map(document.getElementById("map"), {
        // Left this cause hell no. TODO
        zoom: 4,
        center: place
      });
      var marker = new google.maps.Marker({
        position: place,
        map: this.map
      });
    },

    /** getInfo2
     *  Fetching stuff. Does the same thing as getInfo();
     *  Making the rest of the API work with this method would require me to rebuild a couple of other functions
     *    Therefore it's just console.logging()
     */
    getInfo2: function() {
      fetch(Url) // Call the fetch function passing the url of the API as a parameter
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    /** Fetches the API response as JSON
     * I'm not sure how to take the variable outside of .then() scope
     * therefore I'll just change the text here;
     * @param {string} query
     * @returns {void}
     */
    detectLang: function(query) {
      fetch(
        "http://apilayer.net/api/detect?access_key=abbdb2654186ebd4033601f9ed696a1b&query=" +
          encodeURIComponent(query)
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          appAlex.Language = data.results[0].language_name;
          // TODO
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    // ,
    // detectLang: async function(query) {
    //   const response = await fetch(
    //     "http://apilayer.net/api/detect?access_key=abbdb2654186ebd4033601f9ed696a1b&query=" +
    //       encodeURIComponent(query)
    //   );
    //   let data = await response.json();
    //   appAlex.Language = data.results[0].language_name;
    // }
  }
});

// document.addEventListener("DOMContentLoaded", function() {
//   appAlex.Main();
// });
// /** Google maps
//  * Init map function from Google Maps docs
//  */
// function initMap() {
//   var place = {
//     lat: -25.363,
//     lng: 131.044
//     // Barrie's location
//     // lat: 44.4001,
//     // lng: -79.666
//   };
//   map = new google.maps.Map(document.getElementById("map"), {
//     // I made it a global so I can use it in out events
//     zoom: 4,
//     center: place
//   });
//   var marker = new google.maps.Marker({
//     position: place,
//     map: map
//   });
// }

// var appAlex = new Vue({
//   el: "#root",
//   methods: {
//     /** Google maps
//      * Init map function from Google Maps docs
//      */
//     initMap: function() {
//       var place = {
//         lat: -25.363,
//         lng: 131.044
//         // Barrie's location
//         // lat: 44.4001,
//         // lng: -79.666
//       };
//       map = new google.maps.Map(document.getElementById("map"), {
//         // I made it a global so I can use it in out events
//         zoom: 4,
//         center: place
//       });
//       var marker = new google.maps.Marker({
//         position: place,
//         map: map
//       });
//     },
//     findMe: function() {
//       appAlex.getInfo(appAlex.Url).then(ipInfo => {
//         // ipInfo;
//         let lattitude = ipInfo.loc.slice(0, 7);
//         let lng = ipInfo.loc.slice(8, 15);
//         let place = {
//           lat: parseFloat(lattitude),
//           lng: parseFloat(lng)
//         };
//         map.setCenter({
//           lat: place.lat,
//           lng: place.lng
//         });
//         map.setZoom(13);

//         // Making the cursor move to a new location.
//         let marker = new google.maps.Marker({
//           position: place,
//           map: map
//         });
//       });
//     }
//   }
// })
