
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value;
        if (city) {
            try {
                const response = await fetch(`/api/weather?city=${city}`);
                const data = await response.json();

                if (response.ok) {
                    cityName.textContent = data.name;
                    temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
                    description.textContent = data.weather[0].description;
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('An error occurred while fetching weather data.');
            }
        }
    });
});
