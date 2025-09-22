// script.js
const apiKey = '04c15257c6b6594ceb1e7802fc513b5c'; // Get your API key from https://openweathermap.org/

document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
  if (data.cod === '404') {
    alert('City not found!');
    return;
  }

  document.getElementById('cityName').textContent = `Weather in ${data.name}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
}
