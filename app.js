const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const MAX_RECENT = 5;


const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");



async function fetchWeather(city) {
     const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
     const response = await fetch(url);
     if(!response.ok){
        if(response.status === 404){
            throw new Error("City not found");
        } else if(response.status === 401){
            throw new Error("API key not valid yet");
        }else {
            throw new Error("Failed to fetch weather data");
        }
     }
     return await response.json();
}



async function getWeather(city) {
if ((typeof API_KEY === "undefined" || !API_KEY)){
    showError("Missing API key: copy config.example.js to config.js")
        return;
    }
    showLoading();
    hideError();
    try{
        const data = await fetchWeather(city);
        displayWeather(data);
        saveToHistory(data.name);
    } catch(err){
        showError(err.name === "TypeError" ? "Network error — check your connection" : err.message);
    } finally{
        hideLoading();
    }
}



function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    weatherDisplay.classList.remove("hidden");
}
 


function showLoading() { loading.classList.remove("hidden"); weatherDisplay.classList.add("hidden"); }
function hideLoading() { loading.classList.add("hidden"); }
function showError(message) { errorBox.textContent = message; errorBox.classList.remove("hidden"); }
function hideError() { errorBox.classList.add("hidden"); }



function loadRecent() {
    try {
        return JSON.parse(localStorage.getItem("recent")) || [];
    } catch {
        return [];
    }
}
function saveToHistory(city) {
    recent = [city, ...recent.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
    localStorage.setItem("recent", JSON.stringify(recent));
    renderHistory();
}
function renderHistory() {
    historyList.innerHTML = recent.map(city => `<li><button class="history-item">${city}</button></li>`).join("");
}
let recent = loadRecent();






form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        cityInput.value = "";
    }
});

historyList.addEventListener("click", (event) => {
    const btn = event.target.closest(".history-item");
    if (btn) {
        getWeather(btn.textContent);
    }
});


renderHistory();



