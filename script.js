async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "5ff14904f667b49ad29f95a6e731a7d3";

  if (!city) {
    document.getElementById("weather-result").innerHTML =
      "<p>Please enter a city name</p>";
    return;
  }

  try {
    // Get multiple location matches
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      document.getElementById("weather-result").innerHTML =
        "<p>Location not found</p>";
      return;
    }

    // Prefer entries that are real cities
    const selectedLocation = geoData.find(loc => loc.state) || geoData[0];

    const { lat, lon, name, country } = selectedLocation;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    const data = await weatherResponse.json();

    document.getElementById("weather-result").innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>🌡️ ${data.main.temp} °C</p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;

  } catch (error) {
    document.getElementById("weather-result").innerHTML =
      "<p>Something went wrong</p>";
    console.error(error);
  }
}
