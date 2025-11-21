
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

    weatherCard.style.display = 'none'; // Hide card initially

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value;
        if (city) {
            try {
                const response = await fetch(`/api/weather?city=${city}`);
                const data = await response.json();

                if (response.ok) {
                    if (data.location && data.current && data.current.condition) {
                        weatherCard.style.display = 'block'; // Show card
                        cityName.textContent = data.location.name;
                        temperature.textContent = `${data.current.temp_c}°C`;
                        description.textContent = data.current.condition.text;
                        weatherIcon.src = `https:${data.current.condition.icon}`;
                        humidity.textContent = `${data.current.humidity}%`;
                        wind.textContent = `${data.current.wind_kph} km/h`;
                        feelsLike.textContent = `${data.current.feelslike_c}°C`;
                    } else {
                        weatherCard.style.display = 'none'; // Hide card
                        alert('Weather data for the specified city is incomplete. Please try another city.');
                    }
                } else {
                    weatherCard.style.display = 'none'; // Hide card
                    alert(data.error || 'An unknown error occurred.');
                }
            } catch (error) {
                weatherCard.style.display = 'none'; // Hide card
                console.error('Error fetching weather data:', error);
                alert('An error occurred while fetching weather data.');
            }
        }
    });
});
