const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Webhook endpoint to receive weather data by city name
app.post('/webhook/weather', async (req, res) => {
  try {
    const city = req.body.city; 
    const apiKey = 'ccb179d02255c8b6ba92373cb63d2f17'; 
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Make a GET request to the OpenWeatherMap API
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the API response
    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      weather: response.data.weather[0].main,
      description: response.data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
