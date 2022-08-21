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
}
function search(city) {
  let apiKey = "d8fdd97962f426d8117d0a10600ebabf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
