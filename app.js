/**
 * ---------------------------------Table of Contents-------------------------------------------
 *
 * Alex:
 * First API: ipInfo
 * Second API: Google Maps relocation
 * Last API: Language Detection
 *
 * Sarah:
 * First API: Key Detection for Locating function
 * Second API: Speech Synthesis to tell user how to locate themselves
 * Last API: Speech recognition for users to easily say find me and be shown on the map
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
    // TODO
    // I made it a global so I can use it in out events
    zoom: 4,
    center: place
  });
  const marker = new google.maps.Marker({
    position: place,
    map
  });
}

var app = new Vue({
  el: "#root",
  data: {
    Url: "https://ipinfo.io/json",
    Language: "",
    LangInput: "Dzień dobry",
    map: null
  },
  methods: {
    editLangOutput: function(e) {
      e.preventDefault();
      app.detectLang(this.LangInput);
    },

    speakAndFind: function() {
      app.Speak("I'm trying to locate you");
      app.findMe();
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
      app.getInfo(app.Url).then(ipInfo => {
        // ipInfo;
        let lattitude = ipInfo.loc.slice(0, 7);
        let lng = ipInfo.loc.slice(8, 15);
        let place = {
          lat: parseFloat(lattitude),
          lng: parseFloat(lng)
        };
        this.map.setCenter({
          lat: place.lat,
          lng: place.lng
        });
        this.map.setZoom(13);

        // Making the cursor move to a new location.
        let marker = new google.maps.Marker({
          position: place,
          map: this.map
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
          app.Language = data.results[0].language_name;
          // TODO
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // detectLang: async function(query) {
    //   const response = await fetch(
    //     "http://apilayer.net/api/detect?access_key=abbdb2654186ebd4033601f9ed696a1b&query=" +
    //       encodeURIComponent(query)
    //   );
    //   let data = await response.json();
    //   app.Language = data.results[0].language_name;
    // },

    // Sarah's part
    addKeyDetection: function() {
      // ----------------FIRST: Function for key detection----------------
      window.addEventListener("keydown", function(press) {
        // when "f" is pressed the first string is spoken, else if "l" is pressed the second string is spoken.
        // when "l" and "f" is pressed down, function findMe will be called
        if (press.key == "l" || press.key == "L") {
          app.Speak("Hold on, I am trying to locate you");
          app.findMe();
        } else if (press.key == "f" || press.key == "F") {
          app.Speak("Hold on, I am trying to find you");
          app.findMe();
        }
      });
    },
    // ----------------SECOND: Function for speech synthesis----------------
    // A function which lets you say stuff and save code
    // @param {string} whatToSay
    Speak: function(whatToSay) {
      const lookSpeech = new SpeechSynthesisUtterance();
      lookSpeech.text = whatToSay;
      lookSpeech.rate = 1; // setting the speed of how fast the text is being spoken
      // to be sure that when the key is pressed multiple times, the line is only said once when the key is pressed once.
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      speechSynthesis.speak(lookSpeech);
    },
    setupSpeech: function() {
      console.log("speech");
      // ----------------LAST: Function for Speech Recognition----------------
      // creating a function that listens
      // set up the speech regcognition
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const speech = new SpeechRecognition();
      speech.interimResults = false; // THIS WAS CAUSING AN ENDLESS LOOP.
      speech.lang = "en-US"; // maybe don't need this?
      speech.continuous = false; //sets a single result for the one recogonition. Evil
      // speech.maxAlternatives = 1; // sets the number of potential matches that should be returned

      // setting a event to listen for the words find me
      speech.addEventListener("result", e => {
        const transcript = e.results[0][0].transcript;
        // Determines if user says one of the key values
        if (transcript == "find me") {
          app.Speak("Hold on, I am trying to find you");
          app.findMe();
        } else if (transcript == "locate me") {
          app.Speak("Hold on, I am trying to locate you");
          app.findMe();
        } else if (transcript == "where am I") {
          app.Speak("Hold on, I am trying to determine where you are");
          app.findMe();
        }

        console.log(transcript);
      });

      speech.addEventListener("end", speech.start);
      speech.start();

      speech.onspeechend = function(e) {
        speech.stop();
      };
    }
  },
  mounted: function() {
    this.initMap();
    this.addKeyDetection();
    this.setupSpeech();
  }
});
