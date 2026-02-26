async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "5ff14904f667b49ad29f95a6e731a7d3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("weather-result").innerHTML = `
    <h3>${data.name}</h3>
    <p>🌡️ ${data.main.temp} °C</p>
    <p>☁️ ${data.weather[0].description}</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
}
