async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "5ff14904f667b49ad29f95a6e731a7d3";

  if (city === "") {
    document.getElementById("weather-result").innerHTML =
      "<p>Please enter a city name</p>";
    return;
  }

  try {
    // STEP 1: Get closest matching location (handles small typos)
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      document.getElementById("weather-result").innerHTML =
        "<p>City not found 😔</p>";
      return;
    }

    const { lat, lon, name, country } = geoData[0];

    // STEP 2: Get weather using latitude & longitude
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    const data = await weatherResponse.json();

    if (data.cod !== 200) {
      document.getElementById("weather-result").innerHTML =
        "<p>Unable to fetch weather data</p>";
      return;
    }

    // Display result (same style as your original)
    document.getElementById("weather-result").innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>🌡️ ${data.main.temp} °C</p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;

  } catch (error) {
    document.getElementById("weather-result").innerHTML =
      "<p>Something went wrong ⚠️</p>";
    console.error(error);
  }
}
