/**
 * ---------------------------------Table of Contents---------------------------------
 * First API: Key Detection for Locating function
 * Second API: Speech Synthesis to tell user how to locate themselves
 * Last API: Speech recognition for users to easily say find me and be shown on the map
 * ----------------------------------------------------------------------------------------------
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

// let Url = "https://ipinfo.io/json";
// // let Url = "https://api.github.com/users/alex3wielki";
// async function getInfo(url) {
//   const response = await fetch(url);
//   // console.log(response);
//   const data = await response.json();
//   return data;
// }
// let ipInfo = getInfo(Url);
// console.log(ipInfo);

// /**
//  *  Fetching stuff. Does the same thing as getInfo();
//  */
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


// ----------------FIRST: Function for key detection----------------

window.addEventListener('keydown', function(press) {
    // when "l" and "f" is pressed down, function findMe will be called
    if (press.key == "l" || press.key == "f")
        {
            console.log("press");
            determineWhatToSay(press.key);
            // findMe();
        }
});

// ----------------SECOND: Function for Speech Synthesis----------------
// creating a function so that when "f" is pressed the first string is spoken, else if "l" is pressed the second string is spoken. 

function determineWhatToSay(key) {
    const lookSpeech = new SpeechSynthesisUtterance();
    lookSpeech.rate = 2; // setting the speed of how fast the text is being spoken
    // to be sure that when the key is pressed multiple times, the line is only said once when the key is pressed once. 
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
        if (key == "f")
            lookSpeech.text = "Hold on, I am trying to find you";
        else if (key == "l")
            lookSpeech.text = "Hold on, I am trying to locate you";
        speechSynthesis.speak(lookSpeech);    
};

// ----------------LAST: Function for Speech Recognition----------------
// creating a function that hear
    
// set up the speecg regcognition
    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const speak = new SpeechRecognition();
    speak.interimResults = true; 
    speak.lang = "en-US";
    // speak.continuous = false; //sets a single result for the one recogonition
    // speak.maxAlternatives = 1; // sets the number of potential matches that should be returned

    // setting a event to listen for the words find me
    speak.addEventListener("result", e => {
        // speak.start();
        const transcript = e.results[0][0].transcript;
        console.log(transcript);
        document.body.insertAdjacentHTML('beforeEnd', `<p>${transcript}</p>`)
        
    });
    
    // on result, use function to find them on the map and output results

    // speak.onresult = function(e) {
    //     const findThem = event.results[0][0].transcript;
    //     console.log('You are: ' + location);
    //     //show them on map where they are
    // };
    speak.addEventListener("end", speak.start);
    speak.start();

    // set an error function when the user is not heard, or the grammar is wrong.

    // recognition.onerror = function(event) {
    //     diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    //   }

   

