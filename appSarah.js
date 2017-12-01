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
 *  ^^^ (Works on Chrome. Problems on Firefox. Probably not supported yet: https://caniuse.com/#feat=speech-recognition)
 *  Keypress detection //Sarah
 *  Speech synth //Sarah
//  *  Language detection //Alex
//  *  Region highlight //Alex
 * Ajax fetching is happening in appAlex.js
 */

// ----------------FIRST: Function for key detection----------------

window.addEventListener('keydown', function (press) {
    // when "f" is pressed the first string is spoken, else if "l" is pressed the second string is spoken. 
    // when "l" and "f" is pressed down, function findMe will be called
    if (press.key == "l") {
        Speak("Hold on, I am trying to find you");
        findMe();
    } else if (press.key == "f") {
        Speak("Hold on, I am trying to locate you");
        findMe();
    }
});

/** SECOND: Function for Speech Synthesis
 * A function which lets us just say stuff and save code
 * 
 * @param {any} whatToSay 
 */
function Speak(whatToSay) {
    const lookSpeech = new SpeechSynthesisUtterance();
    lookSpeech.text = whatToSay;
    lookSpeech.rate = 2; // setting the speed of how fast the text is being spoken
    // to be sure that when the key is pressed multiple times, the line is only said once when the key is pressed once. 
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    speechSynthesis.speak(lookSpeech);
};

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
    if (transcript == 'find me') {
        Speak("Hold on, I am trying to find you");
        findMe();
    } else if (transcript == 'locate me') {
        Speak("Hold on, I am trying to locate you");
        findMe();
    } else if (transcript == 'where am I') {
        Speak("Hold on, I am trying to determine where you are");
        findMe();
    }


    console.log(transcript);
});

speech.addEventListener("end", speech.start);
speech.start();

speech.onspeechend = function (e) {
    speech.stop();
}