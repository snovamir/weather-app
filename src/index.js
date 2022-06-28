// Display the current date and time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];

  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let dayAndTime = document.querySelector("#current-time");
let currentDate = new Date();
dayAndTime.innerHTML = formatDate(currentDate);

function formatDay(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDayAndMonth.getMonth()];
  let day = currentDayAndMonth.getDate();

  return `${month} ${day}`;
}

let dayAndMonth = document.querySelector("#current-date");
let currentDayAndMonth = new Date();
dayAndMonth.innerHTML = formatDay(currentDayAndMonth);

// When a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#tempnow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#tmax").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#tmin").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", `response.data.weather[0].description`);
}

function search(city) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("click", handleSubmit);
citySearch.addEventListener("submit", handleSubmit);

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API

function showPosition(position) {
  let currentPosition = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentPosition}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCity);

search("Kyiv");
