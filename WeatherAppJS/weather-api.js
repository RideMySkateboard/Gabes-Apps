import { weatherIcons } from './Weather-icons.js';
//Get method for Fetch
const options = {method: 'GET', headers: {accept: 'application/json'}};

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
    cityElement.innerHTML = location.toUpperCase();
    let weatherCondition;
    if (data.data.values.cloudCover <= 30 && data.data.values.rainIntensity < 5) {
      weatherCondition = 'Sunny';
    } else if (data.data.values.cloudCover > 30 && data.data.values.rainIntensity < 5) {
      weatherCondition = 'Cloudy';
    } else if (data.data.values.rainIntensity > 1) {
      weatherCondition = 'Rain';
    }
    weatherImage.innerHTML = `<img src="../../Images/${weatherCondition}.svg" height="100px">`
    let weatherCode = data.data.values.weatherCode;
    conditionsElement.innerHTML = weatherIcons[weatherCode];
    document.querySelector('.rain-uv')
    .innerHTML = 
    `UvIndex: ${data.data.values.uvIndex}<br>Precipitation: ${data.data.values.precipitationProbability}%`;

  })
  .catch(error => console.log('Could not fetch weather'))
}
