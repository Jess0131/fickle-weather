// API Configuration
const API_KEY = 'c60a1861e0cc4e498e6212808250802';
const BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const locationSelect = document.getElementById('location');
const weatherDisplay = document.querySelector('.weather-display');

// Event Listeners
locationSelect.addEventListener('change', handleLocationChange);

// Functions
async function handleLocationChange(event) {
    const location = event.target.value;
    if (location) {
        showLoading();
        try {
            const weatherData = await fetchWeatherData(location);
            displayWeatherData(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            showError('Failed to load weather data. Please try again.');
        }
    } else {
        weatherDisplay.innerHTML = '<p>Please select a location to see the weather.</p>';
    }
}

async function fetchWeatherData(location) {
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`);
    if (!response.ok) {
        throw new Error('Weather data fetch failed');
    }
    return await response.json();
}

function displayWeatherData(data) {
    const weather = data.current;
    weatherDisplay.innerHTML = `
        <div class="weather-info">
            <img src="${weather.condition.icon}" alt="${weather.condition.text}">
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p class="temperature">${weather.temp_c}°C</p>
            <p class="description">${weather.condition.text}</p>
            <div class="weather-details">
                <p>Feels like: ${weather.feelslike_c}°C</p>
                <p>Humidity: ${weather.humidity}%</p>
                <p>Wind: ${weather.wind_kph} km/h</p>
            </div>
        </div>
    `;
}

// Add loading state
function showLoading() {
    weatherDisplay.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Enhance error handling
function showError(message) {
    weatherDisplay.innerHTML = `<p class="error">${message}</p>`;
}

// Initial message
weatherDisplay.innerHTML = '<p>Please select a location to see the weather.</p>';

// Load default weather data when page loads
document.addEventListener('DOMContentLoaded', () => {
    const defaultLocation = 'Toronto';
    locationSelect.value = defaultLocation;
    handleLocationChange({ target: { value: defaultLocation } });
}); 