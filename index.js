
const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    // Log the full error for debugging
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    
    // Default error message
    let errorMessage = 'Failed to fetch weather data';
    let statusCode = 500;

    // If the error is from the weather API, use its message
    if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error.message;
        statusCode = error.response.status;
    }
    
    res.status(statusCode).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
