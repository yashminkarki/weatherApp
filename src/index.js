function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `Today | ${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];
  return days[day];


}

function displayForecast(response){
 
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(day, index){
    if (index < 6){
      forecastHTML = 
    forecastHTML +
   `
    <div class="col-2">
      <div class="weather-forecast-date">
         ${formatDay(day.dt)}
      </div>
               
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" width="50" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-tempertaure-max">
        ${Math.round(day.temp.max)}°
        </span>
        <span class="weather-forecast-tempertaure-min">
       ${Math.round(day.temp.min)}°
        </span>
      </div>
               
   </div>
    `;
    }
    }); 
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates){
 
  let apiKey = "b9f35f56808df0a0ed266768742a6c63";
  let apiUrl = 
  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}
function getWeatherInfo(response) {
 
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiustemp = response.data.main.temp;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  getForecast(response.data.coord);

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
// function searchLocation(position) {
//   let apiKey = "b9f35f56808df0a0ed266768742a6c63";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(getWeatherInfo);
// }

// function getCurrentloc(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let fahrenheitTemperature = celsiustemp * (9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiustemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);

// let currentButton = document.querySelector("#current-button");
// currentButton.addEventListener("click", getCurrentloc);
let celsiustemp = null;


let fahrenheitElement = document.querySelector("#fahrenheit-unit");
fahrenheitElement.addEventListener("click", showFahrenheitTemp);

let celsiusElement = document.querySelector("#celsius-unit");
celsiusElement.addEventListener("click", showCelsiusTemp);

search("New York");

