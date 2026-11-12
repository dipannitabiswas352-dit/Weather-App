
// Your OpenWeatherMap API Key
const API_KEY = "73fd45a7ec5d18fa6744fc35a381af0d";

// Get HTML elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const message = document.getElementById("message");

// Function to fetch weather information
async function getWeather() {

    const city = cityInput.value.trim();

    // Check empty input
    if (city === "") {
        message.textContent = "Please enter a city name!";
        weatherCard.style.display = "none";
        return;
    }

    message.textContent = "Loading weather...";
    weatherCard.style.display = "none";

    // OpenWeatherMap API URL
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {

        // Fetch weather data
        const response = await fetch(url);

        // Check API response
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather data");
        }

        // Extract information from JSON
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].description;
        const weatherMain = data.weather[0].main;
        const cityName = data.name;
        const country = data.sys.country;
        const icon = data.weather[0].icon;

        // Display weather information
        document.getElementById("cityName").textContent =
            `${cityName}, ${country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(temperature)}°C`;

        document.getElementById("humidity").textContent =
            `${humidity}%`;

        document.getElementById("condition").textContent =
            condition;

        document.getElementById("weatherMain").textContent =
            weatherMain;

        // Display weather icon
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

        // Show weather card
        weatherCard.style.display = "block";

        message.textContent = "";

    }

    catch (error) {

        weatherCard.style.display = "none";
        message.textContent = error.message;

    }
}

// Search button click
searchBtn.addEventListener("click", getWeather);

// Search using Enter key
cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});
