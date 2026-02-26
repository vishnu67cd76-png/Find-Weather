async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "8d73b3ba0fab773513ba0f4464937889";
  const resultDiv = document.getElementById("weather-result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name</p>";
    return;
  }

  try {
    // Step 1: Get multiple matches
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const locations = await geoResponse.json();

    if (!locations || locations.length === 0) {
      resultDiv.innerHTML = "<p>No matching locations found</p>";
      return;
    }

    // Step 2: Show all matching results
    resultDiv.innerHTML = "<h4>Select a location:</h4>";

    locations.forEach(location => {
      const option = document.createElement("p");
      option.style.cursor = "pointer";
      option.style.margin = "5px 0";
      option.innerHTML = `📍 ${location.name}, ${location.state || ""} ${location.country}`;

      option.onclick = () => {
        fetchWeatherByCoords(location.lat, location.lon, location.name, location.country);
      };

      resultDiv.appendChild(option);
    });

  } catch (error) {
    resultDiv.innerHTML = "<p>Something went wrong</p>";
    console.error(error);
  }
}

async function fetchWeatherByCoords(lat, lon, name, country) {
  const apiKey = "YOUR_API_KEY";
  const resultDiv = document.getElementById("weather-result");

  try {
    resultDiv.innerHTML = "<p>Loading...</p>";

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    resultDiv.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>🌡️ ${data.main.temp} °C</p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;

  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching weather</p>";
    console.error(error);
  }
}
