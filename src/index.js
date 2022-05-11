//Weather API

function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let cityName = response.data.name;
  h1.innerHTML = `<span id="temp">It is ${temperature}</span><sup><a href="#" class="degree-link">°C</a></sup> with ${description} in <span id="city-shown">${cityName}</span>`;
}

let weatherApiKey = "ad4802884d586a02c0e38d20a9a32180";
let displayCity = "Copenhagen";
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${displayCity}&appid=${weatherApiKey}&units=metric`;

axios.get(weatherApiUrl).then(displayTemperature);

//Geolcation API
function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let cityName = response.data.name;
  h1.innerHTML = `<span id="temp">It is ${temperature}</span><sup><a href="#" class="degree-link">°C</a></sup> with ${description} in <span id="city-shown">${cityName}</span>`;
}

function showPosition(position) {
  let apiKey = "ad4802884d586a02c0e38d20a9a32180";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoButton = document.querySelector("#location-button");
geoButton.addEventListener("click", getCurrentPosition);

//Search function

function searchFunction(event) {
  event.preventDefault();

  let textField = document.querySelector("#text-input");
  let city = textField.value;
  city = city.trim().toLowerCase();

  let cityShown = document.querySelector("#city-shown");
  cityShown.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);

  let weatherApiKey = "ad4802884d586a02c0e38d20a9a32180";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  axios.get(weatherApiUrl).then(displayTemperature);
}

let chooseCity = document.querySelector("#search-field");
chooseCity.addEventListener("submit", searchFunction);

//Code for the date and upcoming days

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}

let year = now.getFullYear();

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
let day = days[now.getDay()];

//Displaying current date and upcoming days

let h5 = document.querySelector("h5");
h5.innerHTML = `On ${day}day, ${month} ${date}, ${year} at ${hours}:${minutes}`;

let tomorrow = document.querySelector("#tomorrow");
tomorrow.innerHTML = days[(now.getDay() + 1) % days.length] + "day";

let dayAfterTomorrow = document.querySelector("#day-after-tomorrow");
dayAfterTomorrow.innerHTML = days[(now.getDay() + 2) % days.length] + "day";
