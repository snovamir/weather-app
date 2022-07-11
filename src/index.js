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
  if (day < 10) {
    day = `0${day}`;
  }

  return `${month} ${day}`;
}

let dayAndMonth = document.querySelector("#current-date");
let currentDayAndMonth = new Date();
dayAndMonth.innerHTML = formatDay(currentDayAndMonth);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let month = date.getMonth();
  month += 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  return `${day}/${month}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row weather-week">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="week-day">${formatForecastDay(forecastDay.dt)}</div>
              <div class="week-date">${formatForecastDate(forecastDay.dt)}</div>
              <img
                class="week-img"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="weather icon"
              />
              <div>
                <span class="t-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="t-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

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

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  search(city.value);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("click", handleSubmit);
citySearch.addEventListener("submit", handleSubmit);

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
