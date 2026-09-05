const API_KEY = CONFIG.WEATHER_API_KEY;
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherInfo').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            showError(data.message || 'City not found. Please try again.');
        }
    } catch (error) {
        showError('Unable to fetch weather. Check your internet connection.');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('condition').textContent = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    document.getElementById('weatherInfo').style.display = 'block';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    document.getElementById('weatherInfo').style.display = 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}
