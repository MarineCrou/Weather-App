//feature 1 : display the current date and time using JavaScript
let today = new Date();

let h6 = document.querySelector("h6");

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = weekDays[today.getDay()];
let hours = today.getHours();
let minutes = today.getMinutes();

h6.innerHTML = `${currentDay} ${hours}:${minutes}`;

//Feature #2 : Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

//bonus points :
//if click #tempFahrenheit = change 25 to 77
//let tempFahrenheit = document.querySelector("#tempFahrenheit");
//let tempCelcius = document.querySelector("#tempCelcius");
//let temperatureTitle = document.querySelector("#temperatureTitle");

//tempCelcius.addEventListener("click", function () {
// temperatureTitle.innerHTML = 25;
//});
//tempFahrenheit.addEventListener("click", function () {
//  temperatureTitle.innerHTML = 77;
//});

let apiKey = "875216e64e4abd111e8dd3c5f75dc098";

function updateTemperature(city, temperature, humidity, wind) {
  let cityElement = document.querySelector("#featuredCity");
  let temperatureElement = document.querySelector("#temperatureDisplayedTitle");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentWind = document.querySelector("#currentWind");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  currentHumidity.innerHTML = humidity;
  currentWind.innerHTML = wind;
}

function handleWeatherResponse(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  updateTemperature(city, temperature, humidity, wind);
}

function fetchWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(handleWeatherResponse);
}

function cityEngine(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityInput").value;
  fetchWeatherData(cityName);
}

let citySearchForm = document.querySelector("#citySearchForm");
citySearchForm.addEventListener("submit", cityEngine);

//Feature 3: when a user searches for a city (example: New York),
//it should display the name of the city on the result page and
//the current temperature of the city.

//bonus points : Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showWeather(response) {
  event.preventDefault();
  let currentLocationButton = document.querySelector("#currentLocationButton");
  let temperature = Math.round(response.data.main.temp);
  currentLocationButton.innerHTML = alert(
    `It is currently ${temperature}° in ${response.data.name}`
  );
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
