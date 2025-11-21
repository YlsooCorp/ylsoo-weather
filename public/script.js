
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
                    cityName.textContent = data.location.name;
                    temperature.textContent = `${data.current.temp_c}°C`;
                    description.textContent = data.current.condition.text;
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
