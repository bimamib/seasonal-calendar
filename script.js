const API_KEY = "bd986657a9ac406294945605242412"; // Ganti dengan API key Anda dari WeatherAPI
const BASE_URL = "https://api.weatherapi.com/v1/current.json";
const COUNTRY = "Indonesia";
const REGION = "Jakarta";

// Fungsi untuk memuat data cuaca saat halaman di-load
document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

// Fungsi untuk mengambil data cuaca dari API
function fetchWeatherData() {
  const url = `${BASE_URL}?key=${API_KEY}&q=${REGION},${COUNTRY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      displayErrorMessage();
    });
}

// Fungsi untuk menampilkan data cuaca di halaman
function displayWeatherData(data) {
  const weatherContainer = document.getElementById("weather-container");

  if (!weatherContainer) {
    console.error("Element with ID 'weather-container' not found!");
    return;
  }

  const location = data.location;
  const current = data.current;

  weatherContainer.innerHTML = `
        <h2>${location.name}, ${location.region}</h2>
        <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${current.condition.text}</p>
        <img src="${current.condition.icon}" alt="${current.condition.text}">
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${current.wind_kph} kph</p>
    `;
}

// Fungsi untuk menampilkan pesan error
function displayErrorMessage() {
  const weatherContainer = document.getElementById("weather-container");

  if (!weatherContainer) {
    console.error("Element with ID 'weather-container' not found!");
    return;
  }

  weatherContainer.innerHTML = `
        <h2>Error</h2>
        <p>Failed to retrieve weather data. Please try again later.</p>
    `;
}
