import { weatherIcons } from './Weather-icons.js';
//Get method for Fetch
const options = {method: 'GET', headers: {accept: 'application/json'}};

getLocation();

function celsiusToFahrenheit(celsius) {
    return (9 / 5 * celsius) + 32;
  }

  const apiKey = '7NTOGSoZM63GN0Z1Xlgq3ul8f21y8yta';
  const searchElement = document.querySelector('.search-bar');
  const searchButton = document.querySelector('.search-button');
  const cityElement = document.querySelector('.city-state');
  const temperatureElement = document.querySelector('.js-temperature');
  const weatherImage = document.querySelector('.weather-image');
  const conditionsElement = document.querySelector('.weather-conditions');

searchButton.addEventListener('click', () => {
  updateWeather();
});
searchElement.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    updateWeather();
  }
});
function updateWeather() {
  const location = searchElement.value;
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`;
  fetchWeather(url, location);
}
//weather fetch with search input
function fetchWeather(url, location) {
  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    temperatureElement.innerHTML = `${Math.round(celsiusToFahrenheit(data.data.values.temperature))}°`;
      
    if (searchElement.value) {
      let exactLocation = data.location.name.split(", ");
      cityElement.innerHTML = exactLocation[0] + ", " + exactLocation[2];
      //cityElement.innerHTML = location.toUpperCase();
    } else {
      cityElement.innerHTML = "My Location";
    }
    let weatherCondition;
    if (data.data.values.cloudCover <= 30 && data.data.values.rainIntensity < 5) {
      weatherCondition = 'Sunny';
    } else if (data.data.values.cloudCover > 30 && data.data.values.rainIntensity < 5) {
      weatherCondition = 'Cloudy';
    } else if (data.data.values.rainIntensity > 1) {
      weatherCondition = 'Rain';
    }
    weatherImage.innerHTML = `<img src="Images/${weatherCondition}.svg" height="100px">`
    let weatherCode = data.data.values.weatherCode;
    conditionsElement.innerHTML = weatherIcons[weatherCode];
    document.querySelector('.rain-uv')
    .innerHTML = 
    `<span class="bold">UVIndex</span> ${data.data.values.uvIndex}<br><span class="bold">Precipitation</span> 
        ${data.data.values.precipitationProbability}%<br><span class="bold">Humidity</span> ${data.data.values.humidity}%`;

  })
  .catch(error => alert('Could not fetch weather, please wait'))
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myLocationsWeather);
  } else {
    cityElement.innerHTML.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function myLocationsWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const location = `${latitude},${longitude}`;
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`;
  fetchWeather(url, location);
}
