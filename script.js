var apiKey = "124811688afe95db4c82dac2490b42d5";
var searchHistory = [];

function handleFormSubmit(event) {
  event.preventDefault();
  
  var city = document.getElementById("city-input").value;

  getWeatherData(city);
}

function getWeatherData(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCurrentWeather(data);

      addCityToHistory(city);
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

function displayCurrentWeather(data) {
  var city = data.name;
  var date = new Date().toLocaleDateString();
  var icon = data.weather[0].icon;
  var temperature = data.main.temp;
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;

  var currentWeatherInfo = document.getElementById("current-weather-info");
  currentWeatherInfo.innerHTML = `
    <h3>${city} - ${date}</h3>
    <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} mph</p>
  `;
}

function addCityToHistory(city) {
  searchHistory.push(city);

  var historyList = document.getElementById("history-list");
  var listItem = document.createElement("li");
  listItem.textContent = city;
  historyList.appendChild(listItem);
}

var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleFormSubmit);
