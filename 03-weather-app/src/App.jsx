import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather() {
    if (city.trim() === "") {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found.");
      }

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="weather-page">
      <div className="weather-container">
        <h1>Weather Dashboard</h1>

        <p>Check the current weather in any city.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a city..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchWeather();
              }
            }}
          />

          <button onClick={searchWeather}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <section className="weather-card">
            <div>
              <h2>{weather.name}</h2>
              <p>{weather.sys.country}</p>
            </div>

            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>

            <p className="condition">
              {weather.weather[0].description}
            </p>

            <div className="weather-details">
              <div>
                <span>Feels like</span>
                <strong>
                  {Math.round(weather.main.feels_like)}°C
                </strong>
              </div>

              <div>
                <span>Humidity</span>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div>
                <span>Wind</span>
                <strong>{weather.wind.speed} m/s</strong>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;