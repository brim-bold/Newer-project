//code to display current date on page
let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[today.getDay()];

function formatMinutes(today) {
  if (today.getMinutes() < 10) {
    return `0${today.getMinutes()}`;
  } else {
    return today.getMinutes();
  }
}

let minutes = formatMinutes(today);

let currentDay = document.querySelector("#time");
currentDay.innerHTML = `${day} ${today.getHours()}:${minutes}`;

//Weather update feature
let apiKey = "1d046e6aaa399d63de49ffe2fb5a384e";

function updateWeather(response) {
  console.log(response);

  let city = document.querySelector("#current-city");
  city.innerHTML = `${response.data.name}`;

  let temperature = document.querySelector("#current-temp");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temp}`;

  let temperatureMax = document.querySelector("#high-temp-current");
  let tempMax = Math.round(response.data.main.temp_max);
  temperatureMax.innerHTML = `${tempMax}°`;

  let temperatureMin = document.querySelector("#low-temp-current");
  let tempMin = Math.round(response.data.main.temp_min);
  temperatureMin.innerHTML = `${tempMin}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let weather = document.querySelector("#current-weather");
  weather.innerHTML = `${response.data.weather[0].description}`;

  let windSpeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${wind}`;
}

//City search feature
function citySearch(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(updateWeather);
}

//Current location feature
let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);

function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}

function currentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getPosition);
}

let current = document.querySelector("#current-location");
current.addEventListener("click", currentLocation);
