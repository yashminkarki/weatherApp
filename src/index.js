function getWeatherInfo(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}
function search(city) {
  let apiKey = "b9f35f56808df0a0ed266768742a6c63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeatherInfo);
}

function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector(".form-city").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "b9f35f56808df0a0ed266768742a6c63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeatherInfo);
}

function getCurrentloc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentloc);

search("New York");
