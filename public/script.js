
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const weatherCard = document.querySelector('.weather-card');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weather-icon');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const feelsLike = document.getElementById('feels-like');
    const forecastContainer = document.getElementById('forecast-container');
    const forecastGrid = document.getElementById('forecast-grid');

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value;
        if (city) {
            await fetchWeatherData(city);
            await fetchForecastData(city);
        }
    });

    async function fetchWeatherData(city) {
        try {
            const response = await fetch(`/api/weather?city=${city}`);
            const data = await response.json();

            if (response.ok) {
                if (data.location && data.current && data.current.condition) {
                    weatherCard.style.display = 'block';
                    cityName.textContent = data.location.name;
                    temperature.textContent = `${data.current.temp_c}°C`;
                    description.textContent = data.current.condition.text;
                    weatherIcon.src = `https:${data.current.condition.icon}`;
                    humidity.textContent = `${data.current.humidity}%`;
                    wind.textContent = `${data.current.wind_kph} km/h`;
                    feelsLike.textContent = `${data.current.feelslike_c}°C`;
                } else {
                    resetUI();
                    alert('Weather data for the specified city is incomplete.');
                }
            } else {
                resetUI();
                alert(data.error || 'An unknown error occurred.');
            }
        } catch (error) {
            resetUI();
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data.');
        }
    }

    async function fetchForecastData(city) {
        try {
            const response = await fetch(`/api/forecast?city=${city}`);
            const data = await response.json();

            if (response.ok) {
                forecastContainer.style.display = 'block';
                forecastGrid.innerHTML = ''; // Clear previous forecast

                data.forEach(forecastDay => {
                    const day = new Date(forecastDay.date).toLocaleDateString('en-US', { weekday: 'short' });
                    const icon = `https:${forecastDay.day.condition.icon}`;
                    const temp = `${Math.round(forecastDay.day.avgtemp_c)}°C`;

                    const forecastItem = document.createElement('div');
                    forecastItem.className = 'forecast-item';
                    forecastItem.innerHTML = `
                        <p class="forecast-day">${day}</p>
                        <img src="${icon}" alt="Weather Icon" class="forecast-icon">
                        <p class="forecast-temp">${temp}</p>
                    `;
                    forecastGrid.appendChild(forecastItem);
                });
            } else {
                forecastContainer.style.display = 'none';
                console.error('Error fetching forecast:', data.error);
            }
        } catch (error) {
            forecastContainer.style.display = 'none';
            console.error('Error fetching forecast data:', error);
        }
    }

    function resetUI() {
        weatherCard.style.display = 'none';
        forecastContainer.style.display = 'none';
        cityName.textContent = '';
        temperature.textContent = '';
        description.textContent = '';
        weatherIcon.src = '';
        humidity.textContent = '';
        wind.textContent = '';
        feelsLike.textContent = '';
        forecastGrid.innerHTML = '';
    }
});
