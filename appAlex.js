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
// let Url = "https://api.github.com/users/alex3wielki";
async function getInfo(url) {
  const response = await fetch(url);
  // console.log(response);
  const data = await response.json();
  return data;
}
let ipInfo = getInfo(Url);
console.log(ipInfo);

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