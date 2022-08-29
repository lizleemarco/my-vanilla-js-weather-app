function formatDate() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  //   let date = now.getDate();
  let currentDate = document.querySelector(".current-date");

  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}

formatDate(new Date());

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      //   days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
            <div class="day">${formatDay(forecastDay.dt)}</div>
            <div class="forecast-icon">
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }.png"
                alt=""
                width="60px"
              />
            </div>
            <div class="forecast-weather-temp">
              <span class="high-left-temp"> ${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="low-right-temp">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
  //   forecastElement.innerHTML = "Forecast";
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".current-temp");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let weatherDescriptionElement = document.querySelector(
    ".weather-description"
  );
  let iconElement = document.querySelector("#icon");
  let cityHeader = document.querySelector(".city-header");

  fahrenheitTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    // `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  cityHeader.innerHTML = response.data.name;
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
//since this is a link it'll be an event
function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitElement.classList.remove("active");
  celsiusElement.classList.add("active");
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = celsiusTemp;
  //   alert(celsiusTemp);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemp);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemp);

search("New York");
displayForecast();
