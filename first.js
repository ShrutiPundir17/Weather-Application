const apiKey = "097cabda39b90fc69728e729acfa99b0"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");
const currentTime = document.getElementById("currentTime");

searchBtn.addEventListener("click", async () => {
    const cityName = cityInput.value.trim();
    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod !== 200) {
            alert(data.message);
            return;
        }
        updateUI(data);
    } catch (error) {
        alert("Error fetching weather data.");
    }
});

function updateUI(data) {
    const temp = data.main.temp;
    const weatherCondition = data.weather[0].main;
    const iconCode = data.weather[0].icon;
    const time = new Date(data.dt * 1000).toLocaleTimeString();

    temperature.textContent = `Temperature: ${temp}°C`;
    condition.textContent = `Condition: ${weatherCondition}`;
    icon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
    currentTime.textContent = `Current Time: ${time}`;

    weatherInfo.style.display = "block";

    // Change background color based on weather
    const colors = {
        Clear: "#87ceeb",
        Clouds: "#d3d3d3",
        Rain: "#778899",
        Snow: "#fffafa",
        Drizzle: "#4682b4",
        Thunderstorm: "#2f4f4f",
        Default: "#f0f8ff",
    };
    document.body.style.backgroundColor =
        colors[weatherCondition] || colors.Default;
}
