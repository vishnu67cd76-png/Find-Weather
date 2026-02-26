async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "8d73b3ba0fab773513ba0f4464937889";
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
