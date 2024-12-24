document.addEventListener("DOMContentLoaded", function () {
  async function fetchData() {
    const currentMonth = new Date().getMonth() + 1;
    let season;

    if (currentMonth >= 11 || currentMonth <= 3) {
      season = "rainy-season";
    } else {
      season = "dry-season";
    }

    try {
      const response = await fetch(`./indonesia-calendar/${season}.json`);
      const data = await response.json();

      const seasonContainer = document.getElementById("season-container");
      const seasonTitle = document.getElementById("season-title");
      const seasonSubtitle = document.getElementById("season-subtitle");
      const seasonDate = document.getElementById("season-date");

      const originalTitle = data.title;
      const originalSubtitle = data.subtitle;
      const originalDate = data.date;
      const description = data.description;

      seasonTitle.textContent = originalTitle;
      seasonSubtitle.textContent = originalSubtitle;
      seasonDate.textContent = originalDate;

      // Set tooltip content
      const tooltipContent = `${description}\n(${originalDate})`;
      seasonTitle.setAttribute("data-tooltip", tooltipContent);

      const isMobile = window.innerWidth <= 580;

      function handleInteraction() {
        if (isMobile || !isMobile) {
          if (seasonTitle.textContent === originalTitle) {
            seasonTitle.textContent = description;
            seasonSubtitle.textContent = "More Details";
            seasonDate.textContent = "";
          } else {
            seasonTitle.textContent = originalTitle;
            seasonSubtitle.textContent = originalSubtitle;
            seasonDate.textContent = originalDate;
          }
        }
      }

      seasonContainer.addEventListener(
        isMobile ? "click" : "mouseenter",
        handleInteraction
      );
      if (!isMobile) {
        seasonContainer.addEventListener("mouseleave", handleInteraction);
      }
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      const seasonTitle = document.getElementById("season-title");
      const seasonSubtitle = document.getElementById("season-subtitle");
      const seasonDate = document.getElementById("season-date");
      seasonTitle.textContent = "Error Loading Data";
      seasonSubtitle.textContent = "";
      seasonDate.textContent = "";
    }
  }

  async function fetchWeatherData() {
    const apiKey = "94f2a64a3b940985a268823eaa344fcb"; // Replace with your OpenWeather API key
    const city = "Jakarta";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const temperature = Math.round(data.main.temp);
      document.getElementById(
        "temperature-info"
      ).textContent = `${temperature}°C`;

      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const weatherIcon = document.getElementById("weather-icon");
      weatherIcon.src = iconUrl;
    } catch (error) {
      console.error("Error fetching or parsing weather data:", error);
      document.getElementById("temperature-info").textContent =
        "Weather data unavailable.";
    }
  }

  fetchData(); // Fetch seasonal data
  fetchWeatherData(); // Fetch weather data
  setInterval(fetchWeatherData, 3600000); // Refresh weather data hourly
});
